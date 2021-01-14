#!/bin/bash
set -e

npm install
npm run lint
npm run format:check
npm run build
npm run test
npm run e2e
