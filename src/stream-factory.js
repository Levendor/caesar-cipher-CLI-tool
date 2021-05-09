import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

export function createReadableStream(pathToFile) {
  if (pathToFile) {
    return createReadStream(pathToFile, { flags: 'r' })
  }
  return process.stdin;
}

export function createWritableStream(pathToFile) {
  if (pathToFile) {
    return createWriteStream(pathToFile, { flags: 'a' });
  }
  return process.stdout;
}

export function createTransformStream(transformFunction, ...args) {
  return new Transform({
    transform(chunk, encoding = 'utf-8', callback) {
      const text = chunk.toString(encoding);
      const encodedText = transformFunction(text, ...args);
      this.push(encodedText);
      this.push('\n');
      callback();
    }
  })
}
