# Trello Done

[![License](https://img.shields.io/github/license/textbook/fauxauth.svg)](https://github.com/textbook/fauxauth/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/textbook/trello-done.svg?branch=master)](https://travis-ci.org/textbook/trello-done)
[![Maintainability](https://api.codeclimate.com/v1/badges/0b7cef1f215d4e35611e/maintainability)](https://codeclimate.com/github/textbook/trello-done/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0b7cef1f215d4e35611e/test_coverage)](https://codeclimate.com/github/textbook/trello-done/test_coverage)

Mark Trello cards as done on IFTTT webhook hit.

## Alternatives

Since I wrote this, [Trello Butler] has come along and replaced it. Here's how
to set up the same logic in that.

  - First, click the Butler button on your board:

    [![Trello "Butler" button in board][1]][1]

  - Then, select the Rules tab and click the Create Rule button:

    [![Butler modal showing Rules tab][2]][2]

  - Next, select and add the appropriate Card Move trigger - *"when a card is
    moved into {list name} by anyone"*:

    [![Create a rule - add a Card Move trigger][3]][3]

  - Finally, select and add the appropriate Dates action - *"mark the due date
    as complete"*:

    [![Create a rule - add a Date action][4]][4]

Click Save to create the rule

## Deployment

If you have the [CF CLI] installed, you can deploy to a [Cloud Foundry] (e.g.
[PWS]) with a `cf push`. Alternatively, click the button below to deploy to
Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/textbook/trello-done)

**Note** that the App name on Heroku is part of `<your service URL>`, so you
should make it hard to guess (not just `trello-done`!) For example, you can
use a site like https://www.browserling.com/tools/random-hex to generate a
random hash and include that in the name, e.g. `trello-done-0123456789abcdef`.

## Environment

Requires the following two environment variables:

  - `TRELLO_API_KEY`: API key for Trello, see https://trello.com/app-key
  - `TRELLO_API_TOKEN`: API token for Trello, see https://stackoverflow.com/a/19486891/3001761

## IFTTT

The other part of the equation is configuring [If This Then That] to hit the
webhook when a card is moved to a specific list in a Trello board. You will
need to set up the Trello connection in IFTTT, then head to [create] to create
your new service. Fill in the following trigger ("This") and action ("That").

### This - Trello: Card added to list

| Field        | Value                     |
| ------------ | ------------------------- |
| Which board? | Select the board          |
| List name    | Type the name of the list |

### That - Webhooks: Make a web request

| Field        | Value                     |
| ------------ | ------------------------- |
| URL          | `<your service URL>/done` |
| Method       | `POST`                    |
| Content Type | `application/json`        |
| Body         | `{"card": "{{CardURL}}"}` |

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

[CF CLI]: https://docs.cloudfoundry.org/cf-cli/
[Cloud Foundry]: https://www.cloudfoundry.org/
[create]: https://ifttt.com/create
[If This Then That]: https://ifttt.com
[PWS]: https://run.pivotal.io
[Trello Butler]: https://help.trello.com/article/1198-an-intro-to-butler

[1]: assets/trello-butler-button.png
[2]: assets/trello-butler-create-rule.png
[3]: assets/trello-butler-select-trigger.png
[4]: assets/trello-butler-select-action.png
