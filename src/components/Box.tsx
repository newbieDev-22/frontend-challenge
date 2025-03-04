interface BoxProps {
  dataList: Array<{ type: string; name: string }>;
  className?: string;
  headerName: string;
  buttonOnClick: (item: { type: string; name: string }) => void;
  getTypeStyles: (type: string) => string;
}

function Box({
  dataList,
  className,
  headerName,
  buttonOnClick,
  getTypeStyles,
}: BoxProps) {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{headerName}</h2>
      <div className="flex flex-col gap-2">
        {dataList.map((item) => (
          <button
            key={item.name}
            onClick={() => buttonOnClick(item)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${getTypeStyles(
              item.type
            )}`}
          >
            {item.name}
          </button>
        ))}
        {dataList.length === 0 && (
          <p className="text-gray-400 text-center py-4">Empty</p>
        )}
      </div>
    </div>
  );
}

export default Box;
