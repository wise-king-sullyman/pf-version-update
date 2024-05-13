#!/usr/bin/env node

const { Command } = require("commander");
const { main } = require("./index");

const program = new Command();

program
  .version(require("./package.json").version)
  .description("Utility to update PatternFly files")
  .arguments("<version>", "Which PF versions to use, e.g. alpha, alpha-2, beta")
  .option(
    "-i, --ignore <files>",
    "Comma-delineated list of files to ignore, files should include their path relative to where this utility is being called. The node_modules dir is ignored by default.",
    ""
  )
  .option(
    "-p, --preview",
    "Run this utility in preview mode to see which files will be changed without actually updating them."
  )
  .option("-v, --verbose", "Include additional logging about processes, mostly useful for debugging.")
  .action(main);

program.parse();
