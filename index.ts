import { io, powertool, CliArgs } from "@pwrtool/kit";

powertool.tool("hello", "says hello", async () => {
  io.out("Hello World!");
});

powertool.tool("io-test", "Testing io", async () => {
  const answer = await io.dichotomous("Are you sure you want to continue?");
  console.log(answer);

  const answer2 = await io.prompt<string>("What is your name?");
  console.log(answer2);
});

powertool.tool("cli-test", "testing cli args", async () => {
  const args = new CliArgs();

  console.log(args.get("name"));
});

powertool.run();
