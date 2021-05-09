import * as path from 'path';
import { accessSync } from 'fs';
import { program } from 'commander';
import { ALLOWED_ACTIONS } from './constants.js';

program
  .requiredOption('-a, --action <action>', 'type of action, required, should be a string and "encode" or "decode" only')
  .requiredOption('-s, --shift <value>', 'cipher key, required, should be an integer value, positive or negative')
  .option('-i, --input [path]', 'path to an input file, optional, should be a valid path to an existed .txt file')
  .option('-o, --output [path]', 'path to an output file, optional, should be a valid path to an existed .txt file')
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

const input = options.input && typeof options.input !== 'boolean'
  ? path.resolve(options.input)
  : '';
if (input) {
  accessSync(input, (error) => {
    if (error) {
      process.stderr.end('Invalid input file! No such file or file is unavailable.');
      process.exit(9);
    }
  });
}

const output = options.output && typeof options.output !== 'boolean'
  ? path.resolve(options.output)
  : '';
if (output) {
  accessSync(output, (error) => {
    if (error) {
      process.stderr.end('Invalid output file! No such file or file is unavailable.');
      process.exit(9);
    }
  });
}

export { action, shift, input, output };
