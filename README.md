# Trello Done

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
