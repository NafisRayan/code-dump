const WhichX = require('whichx');

// Assuming WhichX is a constructor function or class
let whichx = new WhichX();


// Correctly calling methods on the instance
whichx.addLabels("positive");
whichx.addLabels("negative");

whichx.addData("positive", "I love sunny days");
whichx.addData("negative", "I hate rain");

const message = (whichx.classify("The weather is not rainy")); // Should output 'positive'

// Update header text
// document.querySelector('#header').innerHTML = message;

// Log to console
console.log(message);