import { describe, it, expect } from 'vitest';
import { FMPocket } from '../src/index.js';

if (!process.env.VITE_TEST_KEY) throw new Error('Missing key');
const KEY = process.env.VITE_TEST_KEY;

const fmpocket = FMPocket({ key: KEY, debug: true });

describe('test endpoints', () => {
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
    it('listForex', async () => {
        let data = await fmpocket.listForex();
        expect(data.length).toBeGreaterThan(0);
    });
    it('listCrypto', async () => {
        let data = await fmpocket.listCrypto();
        expect(data.length).toBeGreaterThan(0);
    });
});
