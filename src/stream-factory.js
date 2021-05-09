import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

export function createReadableStream(pathToFile) {
  return pathToFile
    ? createReadStream(pathToFile, { flags: 'r' })
    : process.stdin;
}

export function createWritableStream(pathToFile) {
  return pathToFile
    ? createWriteStream(pathToFile, { flags: 'a' })
    : process.stdout;
}

export function createTransformStream(transformFunction, ...args) {
  return new Transform({
    transform(chunk, encoding, callback) {
      const text = chunk.toString();
      const encodedText = transformFunction(text, ...args);
      this.push(encodedText);
      this.push('\n');
      callback();
    }
  })
}
