export class FMPocket {
    #apiKey: string;

    constructor(key: string) {
        if (!key) throw new Error('FMPocket: API key must be provided.');
        this.#apiKey = key;
    }

    #buildUrl(endpoint: string, params: Record<string, any> = {}): string {
        const url = new URL(`stable/${endpoint}`);
        url.searchParams.append('apikey', this.#apiKey);
        for (const key in params) {
            if (params[key] !== undefined) {
                url.searchParams.append(key, String(params[key]));
            }
        }
        return url.toString();
    }

    async #callApi(endpoint: string, params = {}) {
        const url = this.#buildUrl(endpoint, params);
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`FMPocket HTTP Error ${response.status} for ${endpoint}: ${errorBody.slice(0, 100)}...`);
        }
        return await response.json();
    }

    async getQuote(ticker: string) {
        if (!ticker) throw new Error('Ticker is required for getQuote.');
        return this.#callApi(`quote/${ticker.toUpperCase()}`);
    }

    async getBatchQuote(ticker: string) {
        if (!ticker) throw new Error('Ticker is required for getQuote.');
        return this.#callApi(`quote/${ticker.toUpperCase()}`);
    }
}
