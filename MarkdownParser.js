const fileStream = require('fs');
const path = require('path');
const readline = require('readline');

exports.getLastVersion = filePath => {
  const fullPath = path.join(__dirname, filePath);
  const lines = require('fs')
    .readFileSync(fullPath, 'utf-8')
    .split('\n')
    .filter(Boolean);

  let version;
  const versionPoints = [];

  // Looping through each line of CHANGELOG
  lines.forEach(line => {
    // Get the first version only
    if (version && versionPoints.length !== 0) return;

    if (line.indexOf('##') > -1) {
      // If the line is second headline
      version = line.replace('## ', '');
    } else if (line.indexOf('*') > -1) {
      // If the line is a bullet point
      versionPoints.push(line.replace('* ', ''));
    }
  });

  return {
    version: version,
    versionPoints: versionPoints
  };
};
