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
