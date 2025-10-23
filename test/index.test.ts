import { describe, it, expect } from 'vitest';
import { FMPocket } from '../src/index.js';

if (!process.env.VITE_TEST_KEY) throw new Error('Missing key');
const KEY = process.env.VITE_TEST_KEY;

const fmpocket = FMPocket({ key: KEY, debug: true });

describe('test endpoints', () => {
    it('any', async () => {
        let data = await fmpocket.any('/quote', null, { symbol: 'MSFT' });
        // @ts-ignore
        expect(data[0].name).toBe('Microsoft Corporation');
    });
    it('quote', async () => {
        let [data] = await fmpocket.quote('MSFT');
        expect(data.name).toBe('Microsoft Corporation');
    });
    it('batchQuote', async () => {
        let data = await fmpocket.batchQuote(['MSFT', 'AAPL', 'EURUSD']);
        expect(data.length).toBe(3);
        expect(data[0].symbol).toBe('MSFT');
    });
    it('search', async () => {
        let [data] = await fmpocket.search({ query: 'MSFT', by: 'symbol' });
        expect(data.name).toBe('Microsoft Corporation');
    });
    it('intradayChart', async () => {
        let [data] = await fmpocket.intradayChart({
            symbol: 'MSFT',
            from: new Date('2025-10-10'),
            to: new Date('2025-10-20'),
            interval: '4hour',
        });
        expect(data.volume).toBeGreaterThan(0);
    });
    it('fullChart', async () => {
        let [data] = await fmpocket.fullChart({ symbol: 'USDCHF', from: new Date('2025-10-10'), to: new Date('2025-10-20') });
        expect(data.volume).toBeGreaterThan(0);
    });
    it('companyProfile', async () => {
        let [data] = await fmpocket.companyProfile({ symbol: 'POW.TO' });
        expect(data.companyName).toBe('Power Corporation of Canada');
    });
    it('employeeCount', async () => {
        let [data] = await fmpocket.employeeCount({ symbol: 'AAPL' });
        expect(data.symbol).toBe('AAPL');
    });
    it('marketCap', async () => {
        let [data] = await fmpocket.marketCap({ symbol: 'POW.TO' });
        expect(data.symbol).toBe('POW.TO');
    });
    it('listStock', async () => {
        let data = await fmpocket.listStock();
        expect(data.length).toBeGreaterThan(0);
    });
    it('listForex', async () => {
        let data = await fmpocket.listForex();
        expect(data.length).toBeGreaterThan(0);
    });
    it('listCrypto', async () => {
        let data = await fmpocket.listCrypto();
        expect(data.length).toBeGreaterThan(0);
    });
    it('listCommodities', async () => {
        let data = await fmpocket.listCommodities();
        expect(data.length).toBeGreaterThan(0);
    });
    it('marketHours', async () => {
        let [data] = await fmpocket.marketHours('NASDAQ');
        expect(data.exchange).toBe('NASDAQ');
    });
    it('holidays', async () => {
        let [data] = await fmpocket.holidays('NASDAQ');
        expect(data.exchange).toBe('NASDAQ');
    });
    it('keyMetrics', async () => {
        let [data] = await fmpocket.keyMetrics({ symbol: 'POW.TO' });
        expect(data.symbol).toBe('POW.TO');
    });
    it('ratios', async () => {
        let [data] = await fmpocket.ratios({ symbol: 'POW.TO' });
        expect(data.symbol).toBe('POW.TO');
    });
    it('cashFlow', async () => {
        let [data] = await fmpocket.cashFlow({ symbol: 'POW.TO' });
        expect(data.symbol).toBe('POW.TO');
    });
    it('balanceSheet', async () => {
        let [data] = await fmpocket.balanceSheet({ symbol: 'POW.TO' });
        expect(data.symbol).toBe('POW.TO');
    });
    it('income', async () => {
        let [data] = await fmpocket.income({ symbol: 'POW.TO' });
        expect(data.symbol).toBe('POW.TO');
    });
    it('latest', async () => {
        let data = await fmpocket.latest({ page: 1 });
        expect(data.length).toBeGreaterThan(0);
    });
    it('williams', async () => {
        let data = await fmpocket.williams({ symbol: 'AAPL', periodLength: 10, timeframe: '15min' });
        expect(data.length).toBeGreaterThan(0);
    });
    it('batchAftermarketQuote', async () => {
        let data = await fmpocket.batchAftermarketQuote(['AAPL', 'MSFT']);
        expect(data.length).toBeGreaterThan(0);
    });
    it('priceChange', async () => {
        let [data] = await fmpocket.priceChange('MSFT');
        expect(data.symbol).toBe('MSFT');
    });
});
