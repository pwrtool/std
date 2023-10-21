import powertool, { exitWithSuccess, exitWithError } from "@pwrtool/kit";
import { findRunstring } from "@pwrtool/kit";
import $ from "@pwrtool/bx";
import path from "node:path";
import fs from "node:fs";
import { generateRunstring } from "@pwrtool/runstring";
import os from "node:os";

powertool([
  {
    name: "hello-world",
    function: async (IO) => {
      IO.out("Hello world!");

      const name = await IO.prompt("What is your name?\n");
      IO.out(name);

      exitWithSuccess();
    },
  },
  {
    name: "out-msg",
    function: async (IO, CliArgs) => {
      const msg = CliArgs.get("msg") || "";
      if (msg === "") {
        IO.error("No message provided");
        exitWithError();
      }

      const style = CliArgs.get("style") || "none";

      switch (style) {
        case "bold":
          IO.bold(msg);
          break;
        case "header":
          IO.header(msg);
          break;
        case "success":
          IO.success(msg);
          break;
        case "warning" || "warn":
          IO.warn(msg);
          break;
        case "error" || "err":
          IO.error(msg);
          break;
        default:
          IO.out(msg);
          break;
      }
    },
  },
  {
    name: "run-cmd",
    function: async (IO) => {
      const cmd = await IO.prompt("Enter the command to run:\n");
      const result = $`${cmd}`;

      if (result.exitCode !== 0) {
        IO.error("\nSomething went wrong executing your cmd");
      }
      IO.out(result.stdout);

      process.exit(0);
    },
  },
  {
    name: "new-kit",
    function: async (IO, CliArgs) => {
      const templatePath = path.join(process.cwd(), "templates", "kit");
      let projectPath = CliArgs.getRunDir();
      if (CliArgs.exists("path")) {
        projectPath = path.join(projectPath, CliArgs.getOrThrow("path"));
      } else {
        const projectName = await IO.prompt("Enter the project name:\n");
        projectPath = path.join(projectPath, projectName);
      }

      copyDir(templatePath, projectPath);
    },
  },
  {
    name: "test-run",
    function: async (IO, CliArgs) => {
      // testing this tool was very weird
      // I used the test-run to test the test-run
      process.chdir(CliArgs.getRunDir());
      const runstring = findRunstring();

      $`pwrtool test-install`;

      const tool = await IO.prompt("\nWhat tool do you want to run?\n");
      runstring.tool = tool;

      const generated = generateRunstring(runstring);

      // ugly hard coding. It's fine though.
      const file = `${os.homedir()}/.powertool/kits/bench>test/run.sh`;

      IO.header(`\nRunning ${tool} from bench/test:`);
      $`${file} ${generated}`;
    },
  },
]);

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((entry) => {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const srcStat = fs.statSync(srcPath);
    if (srcStat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else if (srcStat.isDirectory()) {
      copyDir(srcPath, destPath);
    }
  });
}
