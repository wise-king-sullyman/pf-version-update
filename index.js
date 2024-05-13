const { glob } = require("glob");
const { writeFile } = require("fs").promises;
const { join } = require("path");

async function updateVersions(filePath, versions, preview) {
  const fileData = require(join(process.cwd(), filePath));
  const { dependencies, devDependencies, peerDependencies } = fileData;
  const packagesInRelease = Object.keys(versions);

  packagesInRelease.forEach((package) => {
    if (dependencies[package]) {
      dependencies[package] = versions[package];
    }

    if (devDependencies[package]) {
      devDependencies[package] = versions[package];
    }

    if (peerDependencies[package]) {
      peerDependencies[package] = versions[package];
    }
  });

  if (preview) {
    console.log("Will update the file ", filePath, " to now be ", fileData);
  } else {
    await writeFile(filePath, JSON.stringify(fileData));
  }
}

async function main(version, options) {
  const { ignore, preview } = options;

  const packageFiles = await glob("**/package.json", {
    ignore: [...ignore.split(","), "node_modules/**"],
  });

  const versions = require("./versions.json")[version];

  packageFiles.forEach((packageFile) =>
    updateVersions(packageFile, versions, preview)
  );
}

module.exports = { main };
