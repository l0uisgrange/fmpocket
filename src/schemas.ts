import { z } from 'zod';

export const shortQuoteSchema = z.array(
    z.object({
        symbol: z.string(),
        price: z.coerce.number(),
        change: z.coerce.number(),
        volume: z.coerce.number(),
    }),
);

export const quoteSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        exchange: z.string(),
        price: z.coerce.number(),
        changePercentage: z.coerce.number(),
        change: z.coerce.number(),
        volume: z.coerce.number(),
        dayLow: z.coerce.number(),
        dayHigh: z.coerce.number(),
        yearHigh: z.coerce.number(),
        yearLow: z.coerce.number(),
        marketCap: z.nullable(z.coerce.number()),
        priceAvg50: z.coerce.number(),
        priceAvg200: z.coerce.number(),
        open: z.coerce.number(),
        previousClose: z.coerce.number(),
        timestamp: z.coerce.number(),
    }),
);

export const lightChartSchema = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        price: z.coerce.number(),
        volume: z.coerce.number(),
    }),
);

export const fullChartSchema = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        open: z.coerce.number(),
        high: z.coerce.number(),
        low: z.coerce.number(),
        close: z.coerce.number(),
        volume: z.coerce.number(),
        change: z.coerce.number(),
        changePercent: z.coerce.number(),
        vwap: z.coerce.number(),
    }),
);

export const intradayChartSchema = z.array(
    z.object({
        date: z.coerce.date(),
        open: z.coerce.number(),
        low: z.coerce.number(),
        high: z.coerce.number(),
        close: z.coerce.number(),
        volume: z.coerce.number(),
    }),
);

export const searchSchema = z.array(
    z.object({
        symbol: z.string(),
        name: z.string(),
        currency: z.string(),
        exchangeFullName: z.nullable(z.string()),
        exchange: z.string(),
    }),
);

export const companyProfileSchema = z.array(
    z.object({
        symbol: z.string(),
        price: z.coerce.number(),
        marketCap: z.nullable(z.coerce.number()),
        beta: z.coerce.number(),
        lastDividend: z.coerce.number(),
        range: z.string(),
        change: z.coerce.number(),
        changePercentage: z.coerce.number(),
        volume: z.coerce.number(),
        averageVolume: z.coerce.number(),
        companyName: z.string(),
        currency: z.string(),
        cik: z.nullable(z.string()),
        isin: z.nullable(z.string()),
        cusip: z.nullable(z.string()),
        exchangeFullName: z.nullable(z.string()),
        exchange: z.string(),
        industry: z.string(),
        website: z.nullable(z.url()),
        description: z.string(),
        ceo: z.nullable(z.string()),
        sector: z.string(),
        country: z.nullable(z.string()),
        fullTimeEmployees: z.nullable(z.string()),
        phone: z.nullable(z.string()),
        address: z.nullable(z.string()),
        city: z.nullable(z.string()),
        state: z.nullable(z.string()),
        zip: z.nullable(z.string()),
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
        employeeCount: z.coerce.number(),
        source: z.url(),
    }),
);

export const marketCap = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        marketCap: z.coerce.number(),
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
        circulatingSupply: z.nullable(z.coerce.number()),
        totalSupply: z.nullable(z.coerce.number()),
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
        exchange: z.nullable(z.string()),
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
        isClosed: z.nullable(z.boolean()),
        adjOpenTime: z.nullable(z.string()),
        adjCloseTime: z.nullable(z.string()),
    }),
);

export const keyMetricsSchema = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        fiscalYear: z.string(),
        period: z.string(),
        reportedCurrency: z.string(),
        marketCap: z.coerce.number(),
        enterpriseValue: z.coerce.number(),
        evToSales: z.coerce.number(),
        evToOperatingCashFlow: z.coerce.number(),
        evToFreeCashFlow: z.coerce.number(),
        evToEBITDA: z.coerce.number(),
        netDebtToEBITDA: z.coerce.number(),
        currentRatio: z.coerce.number(),
        incomeQuality: z.coerce.number(),
        grahamNumber: z.coerce.number(),
        grahamNetNet: z.coerce.number(),
        taxBurden: z.coerce.number(),
        interestBurden: z.coerce.number(),
        workingCapital: z.coerce.number(),
        investedCapital: z.coerce.number(),
        returnOnAssets: z.coerce.number(),
        operatingReturnOnAssets: z.coerce.number(),
        returnOnTangibleAssets: z.coerce.number(),
        returnOnEquity: z.coerce.number(),
        returnOnInvestedCapital: z.coerce.number(),
        returnOnCapitalEmployed: z.coerce.number(),
        earningsYield: z.coerce.number(),
        freeCashFlowYield: z.coerce.number(),
        capexToOperatingCashFlow: z.coerce.number(),
        capexToDepreciation: z.coerce.number(),
        capexToRevenue: z.coerce.number(),
        salesGeneralAndAdministrativeToRevenue: z.coerce.number(),
        researchAndDevelopementToRevenue: z.coerce.number(),
        stockBasedCompensationToRevenue: z.coerce.number(),
        intangiblesToTotalAssets: z.coerce.number(),
        averageReceivables: z.coerce.number(),
        averagePayables: z.coerce.number(),
        averageInventory: z.coerce.number(),
        daysOfSalesOutstanding: z.coerce.number(),
        daysOfPayablesOutstanding: z.coerce.number(),
        daysOfInventoryOutstanding: z.coerce.number(),
        operatingCycle: z.coerce.number(),
        cashConversionCycle: z.coerce.number(),
        freeCashFlowToEquity: z.coerce.number(),
        freeCashFlowToFirm: z.coerce.number(),
        tangibleAssetValue: z.coerce.number(),
        netCurrentAssetValue: z.coerce.number(),
    }),
);

export const ratiosSchema = z.array(
    z.object({
        symbol: z.string(),
        date: z.coerce.date(),
        fiscalYear: z.string(),
        period: z.string(),
        reportedCurrency: z.string(),
        grossProfitMargin: z.coerce.number(),
        ebitMargin: z.coerce.number(),
        ebitdaMargin: z.coerce.number(),
        operatingProfitMargin: z.coerce.number(),
        pretaxProfitMargin: z.coerce.number(),
        continuousOperationsProfitMargin: z.coerce.number(),
        netProfitMargin: z.coerce.number(),
        bottomLineProfitMargin: z.coerce.number(),
        receivablesTurnover: z.coerce.number(),
        payablesTurnover: z.coerce.number(),
        inventoryTurnover: z.coerce.number(),
        fixedAssetTurnover: z.coerce.number(),
        assetTurnover: z.coerce.number(),
        currentRatio: z.coerce.number(),
        quickRatio: z.coerce.number(),
        solvencyRatio: z.coerce.number(),
        cashRatio: z.coerce.number(),
        priceToEarningsRatio: z.coerce.number(),
        priceToEarningsGrowthRatio: z.coerce.number(),
        forwardPriceToEarningsGrowthRatio: z.coerce.number(),
        priceToBookRatio: z.coerce.number(),
        priceToSalesRatio: z.coerce.number(),
        priceToFreeCashFlowRatio: z.coerce.number(),
        priceToOperatingCashFlowRatio: z.coerce.number(),
        debtToAssetsRatio: z.coerce.number(),
        debtToEquityRatio: z.coerce.number(),
        debtToCapitalRatio: z.coerce.number(),
        longTermDebtToCapitalRatio: z.coerce.number(),
        financialLeverageRatio: z.coerce.number(),
        workingCapitalTurnoverRatio: z.coerce.number(),
        operatingCashFlowRatio: z.coerce.number(),
        operatingCashFlowSalesRatio: z.coerce.number(),
        freeCashFlowOperatingCashFlowRatio: z.coerce.number(),
        debtServiceCoverageRatio: z.coerce.number(),
        interestCoverageRatio: z.coerce.number(),
        shortTermOperatingCashFlowCoverageRatio: z.coerce.number(),
        operatingCashFlowCoverageRatio: z.coerce.number(),
        capitalExpenditureCoverageRatio: z.coerce.number(),
        dividendPaidAndCapexCoverageRatio: z.coerce.number(),
        dividendPayoutRatio: z.coerce.number(),
        dividendYield: z.coerce.number(),
        dividendYieldPercentage: z.coerce.number(),
        revenuePerShare: z.coerce.number(),
        netIncomePerShare: z.coerce.number(),
        interestDebtPerShare: z.coerce.number(),
        cashPerShare: z.coerce.number(),
        bookValuePerShare: z.coerce.number(),
        tangibleBookValuePerShare: z.coerce.number(),
        shareholdersEquityPerShare: z.coerce.number(),
        operatingCashFlowPerShare: z.coerce.number(),
        capexPerShare: z.coerce.number(),
        freeCashFlowPerShare: z.coerce.number(),
        netIncomePerEBT: z.coerce.number(),
        ebtPerEbit: z.coerce.number(),
        priceToFairValue: z.coerce.number(),
        debtToMarketCap: z.coerce.number(),
        effectiveTaxRate: z.coerce.number(),
        enterpriseValueMultiple: z.coerce.number(),
    }),
);

export const indicatorSchema = z.object({
    date: z.coerce.date(),
    open: z.coerce.number(),
    high: z.coerce.number(),
    low: z.coerce.number(),
    close: z.coerce.number(),
    volume: z.coerce.number(),
});

export const latestSchema = z.array(
    z.object({
        symbol: z.string(),
        calendarYear: z.coerce.number(),
        period: z.string(),
        date: z.coerce.date(),
        dateAdded: z.coerce.date(),
    }),
);
