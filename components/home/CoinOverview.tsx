import Image from "next/image";

import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import CoinOverviewFallback from "@/components/home/CoinOverviewFallback";
import CandlestickChart from "@/components/CandlestickChart";

export default async function CoinOverview() {
  let coin;
  let coinOHLCData;
  try {
    [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview">
      <CandlestickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          ></Image>
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandlestickChart>
    </div>
  );
}
