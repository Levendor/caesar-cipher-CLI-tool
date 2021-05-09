#!/usr/bin/env node
import { pipeline } from 'stream';
import { CaesarCoder } from '../src/coder.js';
import { action, shift, input, output } from '../src/argument-parser.js';
import {
  createWritableStream,
  createTransformStream,
  createReadableStream,
} from '../src/stream-factory.js';

const transformFunction = new CaesarCoder()[action];

const readable = createReadableStream(input);
const transformable = createTransformStream(transformFunction, shift);
const writable = createWritableStream(output);

const onError = (error) => {
  if (error) process.stderr.end(error.message + '\n')
  process.exit(1);
}

pipeline(
  readable,
  transformable,
  writable,
  onError
);
