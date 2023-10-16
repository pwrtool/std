import powertool from "@pwrtool/kit";

powertool([
  {
    name: "hello-world",
    function: async (IO) => {
      IO.out("Hello world!");
      const name = await IO.prompt("What is your name?\n");
      console.log(name);
    },
  },
]);
