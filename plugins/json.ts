import { plugin } from "bun";
 
plugin({
  name: "YAML",
  async setup(build) {
    const { readFileSync } = await import("fs");
 
    // when a .yaml file is imported...
    build.onLoad({ filter: /.(json|ipynb)$/ }, (args) => {
 
      // read and parse the file
      const text = readFileSync(args.path, "utf8");
      const exports = JSON.parse(text) as Record<string, any>;
 
      // and returns it as a module
      return {
        exports,
        loader: "object", // special loader for JS objects
      };
    });
  },
});