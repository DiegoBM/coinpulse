import DataTable from "@/components/DataTable";

export const CategoriesFallback = () => {
  const columns = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: () => <div className="category-line skeleton" />,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: () => (
        <div className="flex gap-1">
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: () => (
        <div className="change-cell">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => <div className="value-skeleton-lg skeleton" />,
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: () => <div className="value-skeleton-md skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        data={dummyData}
        columns={columns}
        rowKey={(item) => item.id}
        tableClassName="mt-3"
      />
    </div>
  );
};
