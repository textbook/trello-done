#! /usr/bin/env bash

# Implements the "(test && commit) || revert" workflow
# https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864

set -euo pipefail

if [[ $# -ne 1 ]]; then
    echo 'usage: ./tcr.sh <commit message>'
    exit 1
fi

test() {
    npm run ship
}

commit() {
    git add -A && git commit -m "$1"
}

revert() {
    if [[ $(git diff --name-only HEAD) =~ package.*\.json ]]; then
        git reset HEAD --hard && npm ci
    else
        git reset HEAD --hard
    fi
}

(test && commit "$1") || revert
