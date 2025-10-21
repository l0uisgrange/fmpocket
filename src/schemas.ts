import { z } from 'zod';

export const shortQuoteSchema = z.array(
    z.object({
        symbol: z.string(),
        price: z.number(),
        change: z.number(),
        volume: z.number().int(),
    }),
);

export const quoteSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        exchange: z.string(),
        price: z.number(),
        changePercentage: z.number(),
        change: z.number(),
        volume: z.number(),
        dayLow: z.number(),
        dayHigh: z.number(),
        yearHigh: z.number(),
        yearLow: z.number(),
        marketCap: z.number().nullable(),
        priceAvg50: z.number(),
        priceAvg200: z.number(),
        open: z.number(),
        previousClose: z.number(),
        timestamp: z.number().int(),
    }),
);

export const lightChartSchema = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        price: z.number(),
        volume: z.number().int(),
    }),
);

export const fullChartSchema = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        open: z.number(),
        high: z.number(),
        low: z.number(),
        close: z.number(),
        volume: z.number().int(),
        change: z.number(),
        changePercent: z.number(),
        vwap: z.number(),
    }),
);

export const intradayChartSchema = z.array(
    z.object({
        date: z.coerce.date(),
        open: z.number(),
        low: z.number(),
        high: z.number(),
        close: z.number(),
        volume: z.number().int(),
    }),
);

export const searchSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        currency: z.string(),
        exchangeFullName: z.string().nullable(),
        exchange: z.string(),
    }),
);

export const companyProfileSchema = z.array(
    z.object({
        symbol: z.string(),
        price: z.number().positive(),
        marketCap: z.number().nullable(),
        beta: z.number(),
        lastDividend: z.number(),
        range: z.string(),
        change: z.number(),
        changePercentage: z.number(),
        volume: z.number().int(),
        averageVolume: z.number(),
        companyName: z.string(),
        currency: z.string(),
        cik: z.string().nullable(),
        isin: z.string().nullable(),
        cusip: z.string().nullable(),
        exchangeFullName: z.string().nullable(),
        exchange: z.string(),
        industry: z.string(),
        website: z.url().nullable(),
        description: z.string(),
        ceo: z.string().nullable(),
        sector: z.string(),
        country: z.string().nullable(),
        fullTimeEmployees: z.string().nullable(),
        phone: z.string().nullable(),
        address: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        zip: z.string().nullable(),
        image: z.url(),
        ipoDate: z.coerce.date(),
        defaultImage: z.boolean(),
        isEtf: z.boolean(),
        isActivelyTrading: z.boolean(),
        isAdr: z.boolean(),
        isFund: z.boolean(),
    }),
);

export const employeeCount = z.array(
    z.object({
        symbol: z.string(),
        cik: z.string(),
        acceptanceTime: z.coerce.date(),
        periodOfReport: z.coerce.date(),
        companyName: z.string(),
        formType: z.string(),
        filingDate: z.coerce.date(),
        employeeCount: z.number(),
        source: z.url(),
    }),
);

export const marketCap = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        marketCap: z.number(),
    }),
);

export const stockListSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        exchange: z.string(),
        currency: z.string(),
    }),
);

export const cryptoListSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        exchange: z.string(),
        icoDate: z.coerce.date(),
        circulatingSupply: z.number().nullable(),
        totalSupply: z.number().nullable(),
    }),
);

export const forexListSchema = z.array(
    z.object({
        symbol: z.string(),
        fromCurrency: z.string(),
        fromName: z.string(),
        toCurrency: z.string(),
        toName: z.string(),
    }),
);

export const commoditiesListSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        exchange: z.string().nullable(),
        tradeMonth: z.string(),
        currency: z.string(),
    }),
);

export const marketHoursSchema = z.array(
    z.object({
        exchange: z.string(),
        name: z.string(),
        openingHour: z.string(),
        closingHour: z.string(),
        timezone: z.string(),
        isMarketOpen: z.boolean(),
    }),
);

export const holidaysSchema = z.array(
    z.object({
        exchange: z.string(),
        date: z.coerce.date(),
        name: z.string(),
        isClosed: z.boolean().nullable(),
        adjOpenTime: z.string().nullable(),
        adjCloseTime: z.string().nullable(),
    }),
);
