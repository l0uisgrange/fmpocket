import { z } from 'zod';
import { singleQuoteSchema, singleShortQuoteSchema, unboxedQuoteSchema, unboxedShortQuoteSchema } from './schemas.js';

export class FMPocket {
    readonly #apiKey: string;
    readonly #baseUrl: string = 'https://financialmodelingprep.com/';
    readonly #version: string = 'stable';
    readonly #validate: boolean = true;

    /**
     * Instance of FMPocket.
     * @param key The FMP API key.
     * @param baseUrl The FMP base url
     * @param version The API version
     * @param validate Active/deactivate endpoint data validation
     * @throws {Error} If the API key is not provided.
     */
    constructor({ key, baseUrl, version, validate }: { key: string; baseUrl?: string; version?: 'stable'; validate?: boolean }) {
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
     * Validates raw JSON data against a Zod schema.
     * @template T The expected data type after validation.
     * @param data The raw JSON data to validate.
     * @param schema The Zod schema to use for validation.
     * @returns The validated data, typed as T.
     * @throws {Error} If data format validation fails (ZodError).
     */
    #validateData<T>(data: any, schema: z.ZodSchema<T>): T {
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new Error(`Format Check Error: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Executes a generic HTTP call to the FMP API.
     * @template T The data type
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
        const rawData = await response.json();
        if (!this.#validate) {
            return this.#validateData(rawData, schema);
        } else {
            return rawData as T;
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
        return this.#callEndpoint(`/quote`, unboxedQuoteSchema, { symbol: symbol.toUpperCase() });
    }

    /**
     * Retrieves the current short quote for a single stock/forex/crypto symbol.
     * @param symbol The asset symbol (e.g., 'AAPL').
     * @returns The validated short quote data.
     * @throws {Error} If the params or return format are incorrect.
     */
    async shortQuote(symbol: string) {
        if (!symbol) throw new Error('Symbol is required for getShortQuote.');
        return this.#callEndpoint(`/quote-short`, unboxedShortQuoteSchema, { symbol: symbol.toUpperCase() });
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
        return this.#callEndpoint('/batch-quote', z.array(singleShortQuoteSchema), { symbols: symbols.join('%2C') });
    }
}
