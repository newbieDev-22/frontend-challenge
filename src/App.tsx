import Box from "./components/Box";
import Button from "./components/Button";
import { useStore } from "./store/useStore";
import { useEffect } from "react";
import { getColorScheme, getTypeStyles } from "./utils/colors";

function App() {
  const { chooseButtonList, boxesState, moveItemToBox, fetchItems, isLoading } =
    useStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Type Sorter
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Items to Sort
            </h2>
            <div className="flex flex-col gap-2">
              {chooseButtonList.map((item) => (
                <Button
                  key={item.name}
                  text={item.name}
                  onClick={() => moveItemToBox(item.type, item.name)}
                  value={item.type}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-200 ${getColorScheme(
                    item.type
                  )}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            {Object.entries(boxesState).map(([type, items]) => (
              <Box
                key={type}
                dataList={items}
                className="bg-white rounded-xl shadow-lg p-6 min-w-[250px]"
                headerName={type.charAt(0).toUpperCase() + type.slice(1)}
                buttonOnClick={(item) => moveItemToBox(item.type, item.name)}
                getTypeStyles={getTypeStyles}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
