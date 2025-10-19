import { describe, it, expect } from 'vitest';
import { FMPocket } from '../src/index.js';

if (!process.env.VITE_TEST_KEY) throw new Error('Missing key');
const KEY = process.env.VITE_TEST_KEY;

describe('test endpoints', () => {
    it('should correctly return a unique symbol', async () => {
        const fmpocket = FMPocket({ key: KEY, validate: true });
        let data = await fmpocket.quote('MSFT');
        expect(data.name).toBe('Apple Inc.');
    });
});
