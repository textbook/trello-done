#! /usr/bin/env bash

set -euo pipefail

if [[ -z "$(git status --porcelain)" ]]; then
    npm run ship && git push
else
    echo 'cannot ship with uncommitted changes'
    exit 1
fi
