# FMPocket

**FMPocket** 💶 is a lightweight 🪶 universal client for the Financial Modeling Prep (FMP) API 🌎, built with Typescript support and works seamlessly across Node, Deno, and Bun. Gets your financial data perfectly formatted ⭐️.

[Report a bug](https://github.com/l0uisgrange/fmpocket/issues) — [Forum](https://github.com/l0uisgrange/fmpocket/discussions/categories/q-a)

## Installation

```sh
npm install fmpocket
# or
pnpm install fmpocket
# or
deno install npm:fmpocket
# ...
```

## Quick usage

```ts
import { FMPocket } from 'fmpocket';

const fmpocket = FMPocket({ key: process.env.API_KEY });

let [data] = await fmpocket.quote('AAPL');
console.log(data.volume);
```

## Options

The `FMPocket` constructor supports the following options.

| Option     | Description                      | Default                              |
| :--------- | :------------------------------- | :----------------------------------- |
| `key`      | Your API secret key              | _None_ (required)                    |
| `baseUrl`  | The base endpoint URL            | `https://financialmodelingprep.com/` |
| `version`  | The API version                  | `stable`                             |
| `validate` | Validates JSON and coerces data  | `true`                               |
| `debug`    | Logs the URL before the request  | `false`                              |
| `timeout`  | Requests timeout in milliseconds | `null`                               |

## Endpoints

This is the list of currently supported endpoints. If yours is not in this list, please [open a request](https://github.com/l0uisgrange/fmpocket/issues).

### Quote

```ts
// Single quote
let [data] = await fmpocket.quote('AAPL');
// Single short quote
let [data] = await fmpocket.shortQuote('BTCUSD');
// Aftermarket trade
let [data] = await fmpocket.aftermarketTrade('AAPL');
// Aftermarket quote
let [data] = await fmpocket.aftermarketQuote('AAPL');
// Price change
let [data] = await fmpocket.priceChange('AAPL');
// Batch quote
let data = await fmpocket.batchQuote(['AAPL', 'EURUSD', 'BTCUSD']);
// Batch short quote
let data = await fmpocket.batchShortQuote(['AAPL', 'EURUSD', 'BTCUSD']);
```

### Historical price

```ts
// EOD light chart
let data = await fmpocket.lightChart({ symbol: 'AAPL', from: '2025-06-13', to: '2025-10-22' });
// EOD non adjusted chart
let data = await fmpocket.unadjustedChart({ symbol: 'AAPL', from: '2025-06-13', to: '2025-10-22' });
// EOD dividend adjusted chart
let data = await fmpocket.dividendChart({ symbol: 'AAPL', from: '2025-06-13', to: '2025-10-22' });
// EOD full chart
let data = await fmpocket.fullChart({ symbol: 'AAPL', from: '2025-06-13', to: '2025-10-22' });
// Intraday chart
let data = await fmpocket.intradayChart({ symbol: 'AAPL', from: '2025-10-10', to: '2025-10-22', interval: '1hour' });
```

### Search

```ts
// Search by name
let data = await fmpocket.search({ query: 'AAPL' });
// Search by symbol (exchange and limit are optional)
let data = await fmpocket.search({ query: 'AP', by: 'symbol', exchange: 'NASDAQ', limit: 10 });
```

### Company information

```ts
// Company profile (by symbol)
let [data] = await fmpocket.companyProfile({ symbol: 'AAPL' });
// Company profile (by CIK)
let [data] = await fmpocket.companyProfile({ cik: '0000320193' });
// Employee count
let [data] = await fmpocket.employeeCount('AAPL');
// Historical employee count
let [data] = await fmpocket.employeeHistoryCount('AAPL');
// Market capitalization
let [data] = await fmpocket.marketCap('AAPL');
// Batch market capitalization
let data = await fmpocket.batchMarketCap('AAPL');
```

### Financial statements

```ts
// Key metrics
let [data] = await fmpocket.keyMetrics({ symbol: 'POW.TO', period: 'Q3' });
// Financial ratios
let [data] = await fmpocket.ratios({ symbol: 'POW.TO', period: 'Q3' });
```

### List

```ts
// List stocks
let data = await fmpocket.listStock();
// List cryptocurrencies
let data = await fmpocket.listCrypto();
// List forex
let data = await fmpocket.listForex();
// List commodities
let data = await fmpocket.listCommodities();
```

### Market hours

```ts
// Market hours
let [data] = await fmpocket.marketHours('NASDAQ');
// Holidays
let data = await fmpocket.holidays('NASDAQ');
```

### Any

```ts
// Any unsupported endpoint
let [data] = await fmpocket.any('/unsupported-endpoint', null, { foo: 'bar' });
```

This method allows you to use `fmpocket` even for unsupported endpoints if an API update occurs. You can also provide a schema to validate the output.
