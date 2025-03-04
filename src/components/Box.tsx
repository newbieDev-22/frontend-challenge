import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{headerName}</h2>
      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {dataList.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => buttonOnClick(item)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${getTypeStyles(
                item.type
              )}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {item.name}
            </motion.button>
          ))}
        </AnimatePresence>
        {dataList.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-center py-4"
          >
            Empty
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default Box;
