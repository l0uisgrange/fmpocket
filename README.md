# FMPocket

**FMPocket** 💶 is a universal client for the Financial Modeling Prep (FMP) API 🌎, built with Typescript support and works seamlessly across Node, Deno, Bun, and the browser. Gets your financial data perfectly formatted ⭐️.

[Report a bug](https://github.com/l0uisgrange/fmpocket/issues) — [Forum](https://github.com/l0uisgrange/fmpocket/discussions/categories/q-a)

## Quick usage

```typescript
import { FMPocket } from 'fmpocket';

const fmpocket = FMPocket({ key: process.env.API_KEY });

let appleQuotes = fmpocket.quote('AAPL');
```

## Options

The constructor supports the following options.

| Option | Description | Default |
| :--- | :--- | :-- |
| `key` (required) | Your API secret key | _None_ |
| `baseUrl` | The base endpoint URL | `https://financialmodelingprep.com/` |
| `version` | The API version | `stable` |
| `validate` | If `true`, JSON data are validated through Zod to ensure its integrity | `true` |

## Endpoints

This is the list of currently supported endpoints, with more to come.

| Method | API endpoint | Return type |
| :--- | :--- | :--- |
| `quote(symbol)` | `/quote` | `Quote` |
| `shortQuote(symbol)` | `/quote-short` | `ShortQuote` |
| `batchQuote(symbols)` | `/batch-quote` | `Quote[]` |
| `batchShortQuote(symbols)` | `/batch-quote-short` | `ShortQuote[]` |
