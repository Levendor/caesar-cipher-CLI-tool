import * as path from 'path';
import { access } from 'fs';
import { program } from 'commander';
import { ALLOWED_ACTIONS } from './constants.js';

program
  .requiredOption('-a, --action <action>', 'encode or decode action')
  .requiredOption('-s, --shift <value>', 'a shift')
  .option('-i, --input <path>', 'path to input file')
  .option('-o, --output <path>', 'path to output file')
  .parse(process.argv)
const options = program.opts();

const action = options.action;
if (!ALLOWED_ACTIONS.includes(action)) {
process.stderr.end(`Invalid action! Action should be ${ALLOWED_ACTIONS.join(' or ')}`);
process.exit(9);
}

const shift = action === 'encode' ? Number(options.shift) : -Number(options.shift);
if (Number.isNaN(shift) || (shift ^ 0) !== shift) {
process.stderr.end(`Invalid shift! Shift must be integer value.`);
process.exit(9);
}

const input = options.input ? path.resolve(options.input) : options.input;
if (input) {
  access(input, (error) => {
    if (error) {
      process.stderr.end('Invalid input file! No such file or file is unavailable.');
      process.exit(9);
    }
  });
}

const output = options.output ? path.resolve(options.output) : options.output;
if (output) {
  access(output, (error) => {
    if (error) {
      process.stderr.end('Invalid output file! No such file or file is unavailable.');
      process.exit(9);
    }
  });
}

export { action, shift, input, output };
