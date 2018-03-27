#!/bin/bash

npm run build --prod --base-href "https://riderx.github.io/angular-well-config/pr/${TRAVIS_BUILD_ID}/" --dir "pr/${TRAVIS_BUILD_ID}" angular-cli-ghpages
npm run lh --score=70 https://riderx.github.io/angular-well-config/pr/${TRAVIS_BUILD_ID}/
