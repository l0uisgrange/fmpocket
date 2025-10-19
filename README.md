# FMPocket

**FMPocket** 👝 is a universal typed dependency-free 🧹 client for the Financial Modeling Prep (FMP) API, built on standard `fetch` for seamless use across Node, Deno, Bun, and the browser. Gets your financial data perfectly formatted ⭐️.

[Report a bug](https://github.com/l0uisgrange/fmpocket/issues) — [Forum](https://github.com/l0uisgrange/fmpocket/discussions/categories/q-a)

## Quick usage

```typescript
import { FMPocket } from 'fmpocket';

const fmpocket = FMPocket(process.env.API_KEY);

let appleQuotes = fmpocket.getQuote('AAPL');
```