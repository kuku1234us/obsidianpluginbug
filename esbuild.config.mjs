import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { copy } from "esbuild-plugin-copy";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit https://github.com/yourusername/your-plugin-repo
*/`;

const prod = process.argv[2] === "production";

const buildOptions = {
  banner: {
    js: banner,
  },
  entryPoints: ["src/main.tsx"],
  bundle: true,
  external: ["obsidian", "electron", ...builtins],
  plugins: [
    copy({
      assets: [
        {
          from: ["./manifest.json"],
          to: ["./test-vault/.obsidian/plugins/my-plugin/manifest.json"],
        },
        {
          from: ["./main.js"],
          to: ["./test-vault/.obsidian/plugins/my-plugin/main.js"],
        },
      ],
    }),
  ],
  format: "cjs",
  target: "esnext",
  platform: "node",
  logLevel: "info",
  treeShaking: true,
  outfile: "main.js",
  minify: prod,
};

async function build() {
  if (prod) {
    // Production build (no watch)
    await esbuild.build(buildOptions).catch(() => process.exit(1));
  } else {
    // Development build with watch
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch(); // Start watching for changes
    console.log("Watching for changes...");
  }
}

build();