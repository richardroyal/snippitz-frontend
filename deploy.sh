#!/bin/bash

gulp

cp app/scripts/wNumb.js dist/scripts/
cp app/scripts/nouislider.js dist/scripts/
cp app/scripts/audio.js dist/scripts/

mkdir -p dist/audio/
cp app/audio/* dist/audio/

npm run deploy
