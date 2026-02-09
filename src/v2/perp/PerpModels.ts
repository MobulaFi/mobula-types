import { z } from 'zod';

export type ExchangeId = 'gte' | 'gains' | 'hyperliquid' | 'lighter';

/**
 * @DefaultMarketSymbol This is the default market symbol, it should be used nowhere except to define @MarketId
 */
type DefaultMarketSymbol<TExchangeId extends ExchangeId> = `${TExchangeId}-${Lowercase<string>}-${Lowercase<string>}`;

/**
 * @MarketId the universal MarketId for perps, with exchange ids specificities
 */
export type MarketId<TExchangeId extends ExchangeId> = TExchangeId extends 'gains'
  ? `${DefaultMarketSymbol<TExchangeId>}-${Lowercase<string>}` //addition member for collateral
  : DefaultMarketSymbol<TExchangeId>;

export type HoldingFeesTimeframes = '1h' | '8h' | '24h' | '1y';

export type FlattenedHoldingFees = {
  //1h
  fundingFeeShort1hPercentage: number; //eg. 0.005%
  totalFeeShort1hPercentage: number; //eg. 0.006%
  fundingFeeLong1hPercentage: number; //eg. 0.005%
  totalFeeLong1hPercentage: number; //eg. 0.006%

  //4h
  fundingFeeShort8hPercentage: number; //eg. 0.005%
  totalFeeShort8hPercentage: number; //eg. 0.006%
  fundingFeeLong8hPercentage: number; //eg. 0.005%
  totalFeeLong8hPercentage: number; //eg. 0.006%

  //24h
  fundingFeeShort24hPercentage: number; //eg. 0.005%
  totalFeeShort24hPercentage: number; //eg. 0.006%
  fundingFeeLong24hPercentage: number; //eg. 0.005%
  totalFeeLong24hPercentage: number; //eg. 0.006%

  //1y
  fundingFeeShort1yPercentage: number; //eg. 0.005%
  totalFeeShort1yPercentage: number; //eg. 0.006%
  fundingFeeLong1yPercentage: number; //eg. 0.005%
  totalFeeLong1yPercentage: number; //eg. 0.006%
};

export type AssetClasses = 'crypto' | 'forex' | 'stocks' | 'indices' | 'commodities';

const PerpDataRedisSchemaBase = z.object({
  markPriceUSD: z.coerce.number().default(0),
  markPriceQuote: z.coerce.number().default(0),
  oraclePriceUSD: z.coerce.number().default(0),
  isDisabled: z.coerce.boolean(),
  isOpen: z.coerce.boolean(),
  assetClass: z.string().transform((value) => (!value ? 'crypto' : (value as AssetClasses))) as z.ZodType<AssetClasses>,
  spreadPercentage: z.coerce.number().default(0),

  fundingFeeShort1hPercentage: z.coerce.number().default(0),
  totalFeeShort1hPercentage: z.coerce.number().default(0),
  fundingFeeLong1hPercentage: z.coerce.number().default(0),
  totalFeeLong1hPercentage: z.coerce.number().default(0),

  fundingFeeShort8hPercentage: z.coerce.number().default(0),
  totalFeeShort8hPercentage: z.coerce.number().default(0),
  fundingFeeLong8hPercentage: z.coerce.number().default(0),
  totalFeeLong8hPercentage: z.coerce.number().default(0),

  fundingFeeShort24hPercentage: z.coerce.number().default(0),
  totalFeeShort24hPercentage: z.coerce.number().default(0),
  fundingFeeLong24hPercentage: z.coerce.number().default(0),
  totalFeeLong24hPercentage: z.coerce.number().default(0),

  fundingFeeShort1yPercentage: z.coerce.number().default(0),
  totalFeeShort1yPercentage: z.coerce.number().default(0),
  fundingFeeLong1yPercentage: z.coerce.number().default(0),
  totalFeeLong1yPercentage: z.coerce.number().default(0),

  collateral: z.string().optional(),
  //pairIndex: z.coerce.number().optional(),

  marketId: z.string(),
});

export const PerpDataRedisSchemaFlatten = PerpDataRedisSchemaBase.extend({
  oiCollateral_oiLong: z.coerce.number().default(0),
  oiCollateral_oiShort: z.coerce.number().default(0),
  oiCollateral_max: z.coerce.number().optional(),

  leverage_min: z.coerce.number().default(0),
  leverage_max: z.coerce.number().default(0),

  defaultTradingFees_makerFeeBps: z.coerce.number().default(0),
  defaultTradingFees_takerFeeBps: z.coerce.number().default(0),

  liquidationParams_maxLiqSpreadPercentage: z.coerce.number().default(0),
  liquidationParams_startLiqThresholdPercentage: z.coerce.number().default(0),
  liquidationParams_endLiqThresholdPercentage: z.coerce.number().default(0),
  liquidationParams_startLeverage: z.coerce.number().default(0),
  liquidationParams_endLeverage: z.coerce.number().default(0),
});

export type PerpDataRedisFlatten = z.infer<typeof PerpDataRedisSchemaFlatten>;

export const PerpDataRedisSchemaNested = PerpDataRedisSchemaBase.extend({
  defaultTradingFees: z.object({
    makerFeeBps: z.number().default(0),
    takerFeeBps: z.number().default(0),
  }),

  oiCollateral: z.object({
    oiLong: z.number().default(0),
    oiShort: z.number().default(0),
    max: z.number().optional(),
  }),

  leverage: z.object({
    min: z.number().default(0),
    max: z.number().default(0),
  }),

  liquidationParams: z.object({
    maxLiqSpreadPercentage: z.number().default(0),
    startLiqThresholdPercentage: z.number().default(0),
    endLiqThresholdPercentage: z.number().default(0),
    startLeverage: z.number().default(0),
    endLeverage: z.number().default(0),
  }),
});

export type PerpDataRedisNested = z.infer<typeof PerpDataRedisSchemaNested>;

export const PerpDataMarketDetailsOutputSchema = PerpDataRedisSchemaNested.omit({ oiCollateral: true }).extend({
  openInterest: z.object({
    longUSD: z.number().default(0),
    longQuoteToken: z.number().default(0),
    shortUSD: z.number().default(0),
    shortQuoteToken: z.number().default(0),
    maxUSD: z.number().optional(),
    maxQuoteToken: z.number().optional(),
  }),
});

export type PerpDataMarketDetailsOutput = z.infer<typeof PerpDataMarketDetailsOutputSchema>;
