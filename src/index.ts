import { z } from 'zod';
import {
    fullChartSchema,
    lightChartSchema,
    singleQuoteSchema,
    singleShortQuoteSchema,
    unboxedQuoteSchema,
    unboxedShortQuoteSchema,
} from './schemas.js';
import { formatDay } from './format.js';

export class FMPocketClient {
    #apiKey: string = '';
    #baseUrl: string = 'https://financialmodelingprep.com/';
    #version: string = 'stable';
    #validate: boolean = true;

    /**
     * Internal method to set the API key. Called by the exported setup function.
     * @param key The FMP API key.
     * @param baseUrl
     * @param version
     * @param validate
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
     * @param endpoint The API path (e.g., '/quote').
     * @param params The query string parameters to append.
     * @returns The complete request URL, including the API key.
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
     * @template T The data type.
     * @template S The type of Zod's schema.
     * @param endpoint The endpoint path.
     * @param schema The data schema for validation.
     * @param params The request parameters.
     * @returns The JSON response from the API.
     * @throws {Error} If the HTTP response is not OK.
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
     * @param symbol The asset symbol (e.g., 'AAPL').
     * @returns The validated quote data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async quote(symbol: string) {
        if (!symbol) throw new Error('Symbol is required for getQuote.');
        return this.#callEndpoint(`/quote`, unboxedQuoteSchema, { symbol });
    }

    /**
     * Retrieves the current short quote for a single stock/forex/crypto symbol.
     * @param symbol The asset symbol (e.g., 'AAPL').
     * @returns The validated short quote data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async shortQuote(symbol: string) {
        if (!symbol) throw new Error('Symbol is required for getShortQuote.');
        return this.#callEndpoint(`/quote-short`, unboxedShortQuoteSchema, { symbol });
    }

    /**
     * Retrieves the current short quotes for multiple stock/forex/crypto symbols.
     * @param symbols The asset symbols (e.g., '["AAPL", "MSFT"]').
     * @returns The validated quote data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async batchQuote(symbols: string[]) {
        if (!symbols) throw new Error('Symbol is required for getBatchQuote.');
        if (symbols.length <= 1) return [];
        return this.#callEndpoint('/batch-quote', z.array(singleQuoteSchema), { symbols: symbols.join('%2C') });
    }

    /**
     * Retrieves the current short quotes for multiple stock/forex/crypto symbols.
     * @param symbols The asset symbols (e.g., '["AAPL", "MSFT"]').
     * @returns The validated short quote data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async batchShortQuote(symbols: string[]) {
        if (!symbols) throw new Error('Symbol is required for getBatchShortQuote.');
        if (symbols.length <= 1) return [];
        return this.#callEndpoint('/batch-quote-short', z.array(singleShortQuoteSchema), { symbols: symbols.join('%2C') });
    }

    /**
     * Retrieves the current light chart data for a single stock/forex/crypto symbols.
     * @param symbol The asset symbols (e.g., 'AAPL').
     * @param from Start date.
     * @param to End date.
     * @returns The validated light chart data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async lightChart({ symbol, from, to }: { symbol: string; from: Date | string; to: Date | string }) {
        if (!symbol) throw new Error('Symbol is required for lightChart.');
        return this.#callEndpoint('/historical-price-eod/light', lightChartSchema, {
            symbol,
            from: formatDay(from),
            to: formatDay(to),
        });
    }

    /**
     * Retrieves the current full chart data for a single stock/forex/crypto symbols.
     * @param symbol The asset symbols (e.g., 'AAPL').
     * @param from Start date.
     * @param to End date.
     * @returns The validated full chart data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async fullChart({ symbol, from, to }: { symbol: string; from: Date | string; to: Date | string }) {
        if (!symbol) throw new Error('Symbol is required for fullChart.');
        return this.#callEndpoint('/historical-price-eod/full', fullChartSchema, {
            symbol,
            from: formatDay(from),
            to: formatDay(to),
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
