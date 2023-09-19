import { io, powertool, CliArgs, exitWithSuccess } from "@pwrtool/kit";
import { join } from "node:path";
import fs from "node:fs";

// DEMOS
powertool.tool("hello", "says hello", async () => {
  io.out("Hello World!");
});
powertool.tool("io-demo", "Demoing the io", async () => {
  const answer = await io.dichotomous("Are you sure you want to continue?");
  console.log(answer);

  const answer2 = await io.prompt<string>("What is your name?");
  console.log(answer2);

  exitWithSuccess();
});
powertool.tool("cli-demo", "demoing cli args", () => {
  const args = new CliArgs();

  console.log(args.get("name"));

  exitWithSuccess();
});
powertool.tool(
  "cwd-demo",
  "demos getting the cwd from the cli args object",
  () => {
    const args = new CliArgs();
    const cwd = args.get("calldir");

    io.out(`Current working directory: ${cwd}`);
    exitWithSuccess();
  }
);

// TEMPLATES
powertool.tool(
  "template-kit",
  "copies all the necessary files for creating a kit",
  async () => {
    const args = new CliArgs();
    const cwd = args.get<string>("calldir");

    const path = join(
      cwd,
      await io.prompt("Where would you like to create the kit?\n")
    );
    const template_dir = join(import.meta.dir, "templates/kit");

    io.out(`Creating tool at ${path}`);
    io.out(`Copying templates from ${template_dir}`);

    fs.existsSync(path) || fs.mkdirSync(path, { recursive: true });

    // copy the templates to the path
    fs.cpSync(template_dir, path, { recursive: true });

    io.success("\nDone! Enjoy your new kit! 🎉");
    io.out("Run 'bun install' to start developing!");
    io.out("Need help? See the docs or pwrtool/std for guidence.\n");
    exitWithSuccess();
  }
);

// RUN THE FILE
powertool.run();
