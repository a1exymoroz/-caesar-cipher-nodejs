const { pipeline } = require('stream');
const { program } = require('commander');
const fs = require('fs');
const { TransformCaesarCipher } = require('./transformCaesarCipher');

program.storeOptionsAsProperties(false).passCommandToAction(false);

program
  .requiredOption('-a, --action <action>', '')
  .requiredOption('-s, --shift <shift>', '')
  .option('-i, --input <input>', '')
  .option('-o, --output <output>', '');

program.parse(process.argv);

const { input, output, shift, action } = program.opts();

pipeline(
  input ? fs.createReadStream(input) : process.stdin,
  new TransformCaesarCipher(action, shift),
  output ? fs.createWriteStream(output, { flags: 'a' }) : process.stdout,
  (error, a) => {
    if (error) {
      console.error('Fail', error);
    } else {
      console.log('Done', a);
    }
  },
);
