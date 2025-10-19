import { z } from 'zod';

export const singleShortQuoteSchema = z.object({
    symbol: z.string(),
    price: z.number(),
    change: z.number(),
    volume: z.number().int(),
});

export const singleQuoteSchema = z.object({
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
    marketCap: z.number(),
    priceAvg50: z.number(),
    priceAvg200: z.number(),
    open: z.number(),
    previousClose: z.number(),
    timestamp: z.number().int(),
});

export const unboxedQuoteSchema = z
    .array(singleQuoteSchema)
    .min(1)
    .max(1)
    .transform((data) => data[0]);

export const unboxedShortQuoteSchema = z
    .array(singleShortQuoteSchema)
    .min(1)
    .max(1)
    .transform((data) => data[0]);

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
