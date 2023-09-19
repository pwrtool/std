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
  "template-tool",
  "copies all the necessary files for creating a tool",
  async () => {
    const args = new CliArgs();
    const cwd = args.get<string>("calldir");

    const path = join(
      cwd,
      await io.prompt("Where wold you like to create the tool?\n")
    );

    io.out(path);

    fs.existsSync(path) || fs.mkdirSync(path, { recursive: true });

    exitWithSuccess();
  }
);

// RUN THE FILE
powertool.run();
