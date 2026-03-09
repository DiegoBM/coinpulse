import DataTable from "@/components/DataTable";
import { fetcher } from "@/lib/coingecko.actions";
import CategoriesFallback from "./CategoriesFallback";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";

const columns: DataTableColumn<Category>[] = [
  {
    header: "Category",
    cellClassName: "category-cell",
    cell: (category) => category.name,
  },
  {
    header: "Top Gainers",
    cellClassName: "top-gainers-cell",
    cell: (category) =>
      category.top_3_coins.map((coin) => (
        <Image key={coin} src={coin} alt={coin} width={36} height={36} />
      )),
  },
  {
    header: "24h Change",
    cellClassName: "change-header-cell",
    cell: (category) => {
      const usdPrice = category.market_cap_change_24h;
      const isTrendingUp = category.market_cap_change_24h > 0;

      return (
        <div
          className={cn(
            "change-cell",
            isTrendingUp ? "text-green-500" : "text-red-500",
          )}
        >
          <p className="flex items-center gap-0.5">
            {formatPercentage(usdPrice)}
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
        </div>
      );
    },
  },
  {
    header: "Market Cap",
    cellClassName: "market-cap-cell",
    cell: (category) => formatCurrency(category.market_cap),
  },
  {
    header: "24h Volume",
    cellClassName: "volume-cell",
    cell: (category) => formatCurrency(category.volume_24h),
  },
];

export default async function Categories() {
  let categories;
  try {
    categories = await fetcher<Category[]>("/coins/categories", undefined, 300);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <CategoriesFallback />;
  }

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        data={categories?.slice(0, 10)}
        columns={columns}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
}
