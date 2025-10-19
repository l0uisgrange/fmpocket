# FMPocket

**FMPocket** 💶 is a universal client for the Financial Modeling Prep (FMP) API 🌎, built with Typescript support and works seamlessly across Node, Deno, and Bun. Gets your financial data perfectly formatted ⭐️.

[Report a bug](https://github.com/l0uisgrange/fmpocket/issues) — [Forum](https://github.com/l0uisgrange/fmpocket/discussions/categories/q-a)

## Quick usage

```typescript
import { FMPocket } from 'fmpocket';

const fmpocket = FMPocket({ key: process.env.API_KEY });

let appleQuotes = fmpocket.quote('AAPL');
```

## Options

The constructor supports the following options.

| Option     | Description                           | Default                              |
| :--------- | :------------------------------------ | :----------------------------------- |
| `key`      | Your API secret key                   | _None_ (required)                    |
| `baseUrl`  | The base endpoint URL                 | `https://financialmodelingprep.com/` |
| `version`  | The API version                       | `stable`                             |
| `validate` | Validate JSON to ensure its integrity | `true`                               |

## Endpoints

This is the list of currently supported endpoints, with more to come.

| Method                                          | API endpoint                   |
| :---------------------------------------------- | :----------------------------- |
| `quote(symbol)`                                 | `/quote`                       |
| `shortQuote(symbol)`                            | `/quote-short`                 |
| `batchQuote(symbols)`                           | `/batch-quote`                 |
| `batchShortQuote(symbols)`                      | `/batch-quote-short`           |
| `lightChart({ symbol, from, to })`              | `/historical-price-eod/light`  |
| `fullChart({ symbol, from, to })`               | `/historical-price-eod/full`   |
| `intradayChart({ symbol, from, to, interval })` | `/historical-chart/{INTERVAL}` |
| `search({ query, by, exchange, limit })`        | `/search-{BY}`                 |
| `companyProfile({ cik, symbol })`               | `/profile`                     |
