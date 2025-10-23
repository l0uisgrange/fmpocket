import { z } from 'zod';
import {
    commoditiesListSchema,
    companyProfileSchema,
    cryptoListSchema,
    employeeCount,
    forexListSchema,
    fullChartSchema,
    holidaysSchema,
    indicatorSchema,
    intradayChartSchema,
    keyMetricsSchema,
    latestSchema,
    lightChartSchema,
    marketCap,
    marketHoursSchema,
    quoteSchema,
    ratiosSchema,
    searchSchema,
    shortQuoteSchema,
    stockListSchema,
} from './schemas.js';
import { formatDay } from './format.js';
import { Indicator, Interval, Period } from './types.js';

export class FMPocketClient {
    #apiKey: string = '';
    #baseUrl: string = 'https://financialmodelingprep.com/';
    #version: string = 'stable';
    #validate: boolean = true;
    #debug: boolean = false;
    #timeout: number | null = null;

    /**
     * Internal method to set the API key. Called by the exported setup function.
     */
    setup({ key, baseUrl, version, validate, debug, timeout }: FMPocketOptions) {
        if (!key) throw new Error('FMP_API key must be provided.');
        this.#apiKey = key;
        if (baseUrl !== undefined) this.#baseUrl = baseUrl;
        if (version !== undefined) this.#version = version;
        if (validate !== undefined) this.#validate = validate;
        if (debug !== undefined) this.#debug = debug;
        if (timeout !== undefined) this.#timeout = timeout;
    }

    /**
     * Constructs the full URL for an FMP API call.
     */
    #buildUrl(endpoint: string, params: Record<string, any> = {}): string {
        const url = new URL(this.#baseUrl + this.#version + endpoint);
        for (const key in params) {
            if (params[key] !== undefined) {
                url.searchParams.append(key, String(params[key]));
            }
        }
        if (this.#debug) console.log('CALLING', url.href);
        url.searchParams.append('apikey', this.#apiKey);
        return url.toString();
    }

    /**
     * Executes a generic HTTP call to the FMP API.
     */
    async #callEndpoint<T>(endpoint: string, schema: z.ZodSchema<T> | null, params = {}) {
        const url = this.#buildUrl(endpoint, params);
        const response = await fetch(url, { signal: this.#timeout ? AbortSignal.timeout(this.#timeout) : undefined });
        if (!response.ok) throw new Error(`FMPocket HTTP Error ${response.status} for ${endpoint}`);
        const rawData: T = await response.json();
        if (schema && this.#validate) {
            return schema.parse(rawData);
        } else {
            return rawData;
        }
    }

    /**
     * Executes a call to an unsupported endpoint.
     */
    async any(endpoint: string, schema: z.ZodSchema | null = z.any(), params: Record<string, any> = {}) {
        return this.#callEndpoint(endpoint, schema, params);
    }

    /**
     * Retrieves the current quote for a single stock/forex/crypto symbol.
     */
    async quote(symbol: string) {
        return this.#callEndpoint(`/quote`, quoteSchema, { symbol });
    }

    /**
     * Retrieves the current short quote for a single stock/forex/crypto symbol.
     */
    async shortQuote(symbol: string) {
        return this.#callEndpoint(`/quote-short`, shortQuoteSchema, { symbol });
    }

    /**
     * Retrieves the current short quotes for multiple stock/forex/crypto symbols.
     */
    async batchQuote(symbols: string[]) {
        return this.#callEndpoint('/batch-quote', quoteSchema, { symbols: symbols.join(',') });
    }

    /**
     * Retrieves the live short quotes for multiple stock/forex/crypto symbols.
     */
    async batchShortQuote(symbols: string[]) {
        return this.#callEndpoint('/batch-quote-short', shortQuoteSchema, { symbols: symbols.join(',') });
    }

    /**
     * Retrieves the light chart data for a single stock/forex/crypto symbols between two dates.
     */
    async lightChart(params: { symbol: string; from?: Date | string; to?: Date | string }) {
        return this.#callEndpoint('/historical-price-eod/light', lightChartSchema, {
            ...params,
            from: formatDay(params.from),
            to: formatDay(params.to),
        });
    }

    /**
     * Retrieves the full chart data for a single stock/forex/crypto symbols between two dates.
     */
    async fullChart(params: { symbol: string; from?: Date | string; to?: Date | string }) {
        return this.#callEndpoint('/historical-price-eod/full', fullChartSchema, {
            ...params,
            from: formatDay(params.from),
            to: formatDay(params.to),
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
        interval: Interval;
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

    /**
     * Access detailed company profile data.
     */
    async companyProfile({ cik, symbol }: { symbol: string; cik?: never } | { cik: string; symbol?: never }) {
        if (!cik && !symbol) throw new Error('Symbol or CIK is required for companyProfile.');
        if (symbol) {
            return this.#callEndpoint('/profile', companyProfileSchema, { symbol });
        } else {
            return this.#callEndpoint('/profile-cik', companyProfileSchema, { cik });
        }
    }

    /**
     * Retrieve detailed workforce information for companies, including employee count, reporting period, and filing date.
     */
    async employeeCount(params: { symbol: string; limit?: number }) {
        return this.#callEndpoint('/employee-count', employeeCount, params);
    }

    /**
     * Access historical employee count data for a company based on specific reporting periods.
     */
    async employeeHistoryCount(params: { symbol: string; limit?: number }) {
        return this.#callEndpoint('/historical-employee-count', employeeCount, params);
    }

    /**
     * Retrieve the market capitalization for a specific company on any given date.
     */
    async marketCap(params: { symbol: string; limit?: number }) {
        return this.#callEndpoint('/market-capitalization', marketCap, params);
    }

    /**
     * Retrieve market capitalization data for multiple companies in a single request.
     */
    async batchMarketCap(symbols: string[]) {
        return this.#callEndpoint('/market-capitalization-batch', marketCap, { symbols: symbols.join(',') });
    }

    /**
     * Access a comprehensive list of all stocks traded on exchanges worldwide.
     */
    async listStock() {
        return this.#callEndpoint('/index-list', stockListSchema, {});
    }

    /**
     * Access a comprehensive list of all cryptocurrencies traded on exchanges worldwide.
     */
    async listCrypto() {
        return this.#callEndpoint('/cryptocurrency-list', cryptoListSchema, {});
    }

    /**
     * Access a comprehensive list of all currency pairs traded on the forex market.
     */
    async listForex() {
        return this.#callEndpoint('/forex-list', forexListSchema, {});
    }

    /**
     * Access an extensive list of tracked commodities across various sectors.
     */
    async listCommodities() {
        return this.#callEndpoint('/commodities-list', commoditiesListSchema, {});
    }

    /**
     * Retrieve trading hours for specific stock exchanges.
     */
    async marketHours(exchange: string) {
        return this.#callEndpoint('/exchange-market-hours', marketHoursSchema, { exchange });
    }

    /**
     * Retrieve holidays for specific stock exchanges.
     */
    async holidays(exchange: string) {
        return this.#callEndpoint('/holidays-by-exchange', holidaysSchema, { exchange });
    }

    /**
     * Access essential financial metrics for a company.
     */
    async keyMetrics(params: { symbol: string; limit?: number; period?: Period }) {
        return this.#callEndpoint('/key-metrics', keyMetricsSchema, params);
    }

    /**
     * Analyze a company's financial performance.
     */
    async ratios(params: { symbol: string; limit?: number; period?: Period }) {
        return this.#callEndpoint('/ratios', ratiosSchema, params);
    }

    /**
     * Calls a technical indicator endpoint
     */
    async #indicator({ indicator, ...params }: IndicatorsParams & { indicator: Indicator }) {
        return this.#callEndpoint(
            '/technical-indicators/' + indicator.toLowerCase(),
            z.array(indicatorSchema.extend({ [indicator]: z.coerce.number() })),
            {
                ...params,
                from: formatDay(params.from),
                to: formatDay(params.to),
            },
        );
    }

    /**
     * Simple moving average technical indicator
     */
    async sma(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'sma' });
    }

    /**
     * Exponential moving average technical indicator
     */
    async ema(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'ema' });
    }

    /**
     * Weighted moving average technical indicator
     */
    async wma(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'wma' });
    }

    /**
     * Double exponential moving average technical indicator
     */
    async dema(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'dema' });
    }

    /**
     * Triple exponential moving average technical indicator
     */
    async tema(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'tema' });
    }

    /**
     * Relative strength index technical indicator
     */
    async rsi(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'rsi' });
    }

    /**
     * Standard deviation technical indicator
     */
    async std(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'standardDeviation' });
    }

    /**
     * Williams technical indicator
     */
    async williams(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'williams' });
    }

    /**
     * Average directional index technical indicator
     */
    async adx(params: IndicatorsParams) {
        return this.#indicator({ ...params, indicator: 'adx' });
    }

    /**
     * Retrieves latest financial statements
     */
    async latest(params: { page?: number; limit?: number }) {
        return this.#callEndpoint('/latest-financial-statements', latestSchema, params);
    }

    /**
     * Access detailed income statement data for publicly traded companies
     */
    async income(params: { symbol: string; limit?: number; period?: Period }) {
        return this.#callEndpoint('/income-statement', latestSchema, params);
    }

    /**
     * Access detailed balance sheet statements for publicly traded companies
     */
    async balanceSheet(params: { symbol: string; limit?: number; period?: Period }) {
        return this.#callEndpoint('/balance-sheet-statement', latestSchema, params);
    }

    /**
     * Gain insights into a company's cash flow activities
     */
    async cashFlow(params: { symbol: string; limit?: number; period?: Period }) {
        return this.#callEndpoint('/cash-flow-statement', latestSchema, params);
    }
}

const client = new FMPocketClient();

export interface FMPocketOptions {
    key: string;
    baseUrl?: string;
    version?: 'stable';
    validate?: boolean;
    debug?: boolean;
    timeout?: number | null;
}

export interface IndicatorsParams {
    symbol: string;
    periodLength: number;
    timeframe: Interval | '1day';
    from?: string | Date;
    to?: string | Date;
}

export function FMPocket(params: FMPocketOptions) {
    client.setup(params);
    return client;
}
