const fs = require('fs');

const data = fs.readFileSync('README.md', 'utf8');

const wordCount = data.split(' ').length;

const wordsReactCount = data.match(/React/ig).length;

console.log(`# de palabras: ${wordCount}`);
console.log(`# de palabras en React: ${wordsReactCount}`);

