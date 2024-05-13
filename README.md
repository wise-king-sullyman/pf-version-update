# pf-version-update

Utility to update PatternFly dependency versions in your project

```sh
Usage: npx pf-version-update@latest [options] <version>

Options:
  -V, --version         output the version number
  -i, --ignore <files>  Comma-delineated list of files to ignore, files should include their path relative to where this utility is being called. The node_modules dir is ignored by default. (default: "")
  -p, --preview         Run this utility in preview mode to see which files will be changed without actually updating them.
  -v, --verbose         Include additional logging about processes, mostly useful for debugging.
  -h, --help            display help for command
```
