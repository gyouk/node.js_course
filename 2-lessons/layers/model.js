const fs = require('fs');
const path = './tasks.json';

function read() {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function write(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { read, write };
