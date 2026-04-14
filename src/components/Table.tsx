const Table = ({
  columns,
  renderRow,
  data,
  headerClassName,
}: {
  columns: { header: React.ReactNode; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
  headerClassName?: string;
}) => {
  return (
    <table className="w-full mt-4">
      <thead className={headerClassName || "bg-[#f8fafc] border-b border-gray-100"}>
        <tr className="text-left text-[#1e293b] text-xs font-bold uppercase tracking-wider">
          {columns.map((col, index) => (
            <th key={col.accessor || `col-${index}`} className={`py-4 px-4 ${col.className || ""}`}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
