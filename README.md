# Trello Done

[![License](https://img.shields.io/github/license/textbook/fauxauth.svg)](https://github.com/textbook/fauxauth/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/textbook/trello-done.svg?branch=master)](https://travis-ci.org/textbook/trello-done)
[![Maintainability](https://api.codeclimate.com/v1/badges/0b7cef1f215d4e35611e/maintainability)](https://codeclimate.com/github/textbook/trello-done/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0b7cef1f215d4e35611e/test_coverage)](https://codeclimate.com/github/textbook/trello-done/test_coverage)

Mark Trello cards as done on IFTTT webhook hit.

## Environment

Requires the following two environment variables:

  - `TRELLO_API_KEY`: API key from https://trello.com/app-key
  - `TRELLO_API_TOKEN`: API token with write permissions (see e.g.
    https://stackoverflow.com/a/19486891/3001761 for how to generate this)

## API

Exposes a single endpoint, `/done`, which expects a `POST` request with a JSON
body containing a single key, `"card"`, whose value is a Trello card URL. For
example, using `curl`:

```bash
curl \
    '<your service URL>/done' \
    -X POST \
    -H 'Content-Type: application/json' \
    -d '{"card": "https://trello.com/c/<your card ID>"}'
```
