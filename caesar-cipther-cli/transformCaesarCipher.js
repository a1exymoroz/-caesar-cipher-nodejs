const { Transform } = require('stream');

class TransformCaesarCipher extends Transform {
  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = shift;
  }

  _transform(chunk, encoding, callback) {
    try {
      const str = chunk.toString('utf8');
      let numberShift = 0;

      if (this.action === 'encode') {
        numberShift = +this.shift;
      }

      if (this.action === 'decode') {
        numberShift = -this.shift;
      }

      const resultString = this.caesarShift(str, numberShift);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }

  caesarShift(str, amount) {
    // Wrap the amount
    if (amount < 0) {
      return this.caesarShift(str, amount + 26);
    }

    // Make an output variable
    var output = '';

    // Go through each character
    for (var i = 0; i < str.length; i++) {
      // Get the character we'll be appending
      var c = str[i];

      // If it's a letter...
      if (c.match(/[a-z]/i)) {
        // Get its code
        var code = str.charCodeAt(i);

        // Uppercase letters
        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        }

        // Lowercase letters
        else if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }

      // Append
      output += c;
    }

    // All done!
    return output;
  }
}

module.exports = {
  TransformCaesarCipher,
};
