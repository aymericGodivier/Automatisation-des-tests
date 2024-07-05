const fs = require('fs');
const path = require('path');

const reportsDir = './cypress/reports';

fs.readdir(reportsDir, (err, files) => {
  if (err) {
    console.error('Error reading reports directory:', err);
    process.exit(1);
  }

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(reportsDir, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', filePath, err);
          return;
        }

        try {
          JSON.parse(data);
          console.log('Valid JSON file:', filePath);
        } catch (parseErr) {
          console.error('Invalid JSON file:', filePath, parseErr.message);
        }
      });
    }
  });
});