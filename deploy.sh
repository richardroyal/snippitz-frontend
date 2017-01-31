#!/bin/bash

gulp

cp app/scripts/wNumb.js dist/scripts/
cp app/scripts/nouislider.js dist/scripts/
cp app/scripts/audio.js dist/scripts/

npm run deploy
