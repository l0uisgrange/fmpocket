import { z } from 'zod';
import { fullChartSchema, intradayChartSchema, lightChartSchema, quoteSchema, searchSchema, shortQuoteSchema } from './schemas.js';
import { formatDay } from './format.js';

export class FMPocketClient {
    #apiKey: string = '';
    #baseUrl: string = 'https://financialmodelingprep.com/';
    #version: string = 'stable';
    #validate: boolean = true;

    /**
     * Internal method to set the API key. Called by the exported setup function.
     */
    setup({ key, baseUrl, version, validate }: FMPocketOptions) {
        if (!key) throw new Error('FMP_API key must be provided.');
        this.#apiKey = key;
        if (baseUrl !== undefined) this.#baseUrl = baseUrl;
        if (version !== undefined) this.#version = version;
        if (validate !== undefined) this.#validate = validate;
    }

    /**
     * Constructs the full URL for an FMP API call.
     */
    #buildUrl(endpoint: string, params: Record<string, any> = {}): string {
        const url = new URL(this.#baseUrl + this.#version + endpoint);
        url.searchParams.append('apikey', this.#apiKey);
        for (const key in params) {
            if (params[key] !== undefined) {
                url.searchParams.append(key, String(params[key]));
            }
        }
        return url.toString();
    }

    /**
     * Executes a generic HTTP call to the FMP API.
     */
    async #callEndpoint<T>(endpoint: string, schema: z.ZodSchema<T>, params = {}) {
        const url = this.#buildUrl(endpoint, params);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`FMPocket HTTP Error ${response.status} for ${endpoint}`);
        const rawData: T = await response.json();
        if (this.#validate) {
            return schema.parse(rawData);
        } else {
            return rawData;
        }
    }

    /**
     * Retrieves the current quote for a single stock/forex/crypto symbol.
     */
    async quote(symbol: string) {
        if (!symbol) throw new Error('Symbol is required for getQuote.');
        return this.#callEndpoint(`/quote`, quoteSchema, { symbol });
    }

    /**
     * Retrieves the current short quote for a single stock/forex/crypto symbol.
     */
    async shortQuote(symbol: string) {
        if (!symbol) throw new Error('Symbol is required for getShortQuote.');
        return this.#callEndpoint(`/quote-short`, shortQuoteSchema, { symbol });
    }

    /**
     * Retrieves the current short quotes for multiple stock/forex/crypto symbols.
     */
    async batchQuote(symbols: string[]) {
        if (!symbols) throw new Error('Symbol is required for getBatchQuote.');
        if (symbols.length <= 1) return [];
        return this.#callEndpoint('/batch-quote', quoteSchema, { symbols: symbols.join('%2C') });
    }

    /**
     * Retrieves the current short quotes for multiple stock/forex/crypto symbols.
     */
    async batchShortQuote(symbols: string[]) {
        if (!symbols) throw new Error('Symbol is required for getBatchShortQuote.');
        if (symbols.length <= 1) return [];
        return this.#callEndpoint('/batch-quote-short', shortQuoteSchema, { symbols: symbols.join('%2C') });
    }

    /**
     * Retrieves the light chart data for a single stock/forex/crypto symbols between two dates.
     */
    async lightChart({ symbol, from, to }: { symbol: string; from?: Date | string; to?: Date | string }) {
        if (!symbol) throw new Error('Symbol is required for lightChart.');
        return this.#callEndpoint('/historical-price-eod/light', lightChartSchema, {
            symbol,
            from: formatDay(from),
            to: formatDay(to),
        });
    }

    /**
     * Retrieves the full chart data for a single stock/forex/crypto symbols between two dates.
     */
    async fullChart({ symbol, from, to }: { symbol: string; from?: Date | string; to?: Date | string }) {
        if (!symbol) throw new Error('Symbol is required for fullChart.');
        return this.#callEndpoint('/historical-price-eod/full', fullChartSchema, {
            symbol,
            from: formatDay(from),
            to: formatDay(to),
        });
    }

    /**
     * Retrieves the intraday chart data for a single stock/forex/crypto symbols.
     */
    async intradayChart({
        symbol,
        from,
        to,
        nonadjusted = true,
        interval,
    }: {
        symbol: string;
        from?: Date | string;
        to?: Date | string;
        nonadjusted?: boolean;
        interval: '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';
    }) {
        if (!symbol) throw new Error('Symbol is required for intradayChart.');
        return this.#callEndpoint(`/historical-chart/${interval}`, intradayChartSchema, {
            symbol,
            from: formatDay(from),
            to: formatDay(to),
            nonadjusted,
        });
    }

    /**
     * Searches symbols based on text and filters
     */
    async search({ query, limit, exchange, by = 'name' }: { query: string; by?: 'name' | 'symbol'; limit?: number; exchange?: string }) {
        if (!query) return [];
        return this.#callEndpoint(`/search-${by}`, searchSchema, {
            query,
            limit,
            exchange,
        });
    }
}

const client = new FMPocketClient();

export interface FMPocketOptions {
    key: string;
    baseUrl?: string;
    version?: 'stable';
    validate?: boolean;
}

export function FMPocket(params: FMPocketOptions) {
    client.setup(params);
    return client;
}
