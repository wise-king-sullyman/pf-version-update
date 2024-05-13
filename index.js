const { glob } = require("glob");
const { writeFile } = require("fs").promises;
const { join } = require("path");

async function updateVersions(filePath, versions, preview, verbose) {
  verbose && console.log("Inspecting", filePath);

  const fileData = require(join(process.cwd(), filePath));
  const packagesInRelease = Object.keys(versions);

  verbose && console.log("PF packages in this release: ", packagesInRelease);

  let updates = {};

  packagesInRelease.forEach((package) => {
    ["dependencies", "devDependencies", "peerDependencies"].forEach(
      (depKind) => {
        const depValue = fileData[depKind];
        if (!depValue) {
          return;
        }

        const currentPackageValue = depValue[package];
        const newPackageValue = versions[package];

        if (!currentPackageValue || currentPackageValue === newPackageValue) {
          return;
        }

        fileData[depKind][package] = newPackageValue;
        updates = {
          ...updates,
          [depKind]: {
            ...updates[depKind],
            [package]: { current: currentPackageValue, new: newPackageValue },
          },
        };
      }
    );
  });

  const hasUpdates = Object.keys(updates).length > 0;

  if (verbose || hasUpdates) {
    console.log(filePath, ": ", updates);
  }

  if (preview) {
    return;
  }

  if (hasUpdates) {
    await writeFile(filePath, JSON.stringify(fileData));
  }
}

async function main(version, options) {
  const { ignore, preview, verbose } = options;

  const packageFiles = await glob("**/package.json", {
    ignore: [...ignore.split(","), "node_modules/**"],
  });

  verbose && console.log("Found files: ", packageFiles);

  const versions = require("./versions.json")[version];

  packageFiles.forEach((packageFile) =>
    updateVersions(packageFile, versions, preview, verbose)
  );

  if (preview) {
    console.log(
      "Exiting without making changes because this is running in preview mode."
    );
  }
}

module.exports = { main };
