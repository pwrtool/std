import powertool, { exitWithSuccess, exitWithError } from "@pwrtool/kit";
import $ from "@pwrtool/bx";

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
]);
