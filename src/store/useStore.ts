import { create } from "zustand";
import { Item, BoxState } from "../types";

const MOCK_ITEMS = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

const TIMEOUT_DURATION = 5000;

interface Store {
  chooseButtonList: Item[];
  boxesState: BoxState;
  timeouts: Record<string, number | undefined>;
  isLoading: boolean;
  moveItemToBox: (type: string, name: string) => void;
  fetchItems: () => Promise<void>;
}

const getUniqueTypes = (data: Array<{ type: string; name: string }>) =>
  Array.from(new Set(data.map((item) => item.type)));

const transformData = (data: Array<{ type: string; name: string }>): Item[] =>
  data.map((item) => ({
    type: item.type,
    name: item.name,
    inBox: false,
  }));

const initializeBoxState = (types: string[]): BoxState =>
  types.reduce((acc, type) => ({ ...acc, [type.toLowerCase()]: [] }), {});

export const useStore = create<Store>((set, get) => ({
  chooseButtonList: [],
  boxesState: {},
  timeouts: {},
  isLoading: false,

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const transformedData = transformData(MOCK_ITEMS);
      const types = getUniqueTypes(MOCK_ITEMS);

      set({
        chooseButtonList: transformedData,
        boxesState: initializeBoxState(types),
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch items:", error);
      set({ isLoading: false });
    }
  },

  moveItemToBox: (type: string, name: string) => {
    const state = get();
    const boxType = type.toLowerCase();

    // Clear existing timeout if any
    if (state.timeouts[name]) {
      clearTimeout(state.timeouts[name]);
    }

    const moveBackToList = (type: string, name: string) => {
      set((state) => ({
        chooseButtonList: [
          ...state.chooseButtonList,
          { type, name, inBox: false },
        ],
        boxesState: Object.fromEntries(
          Object.entries(state.boxesState).map(([key, items]) => [
            key,
            items.filter((item) => item.name !== name),
          ])
        ),
        timeouts: {
          ...state.timeouts,
          [name]: undefined,
        },
      }));
    };

    const handleMoveToBox = () => {
      set((state) => ({
        boxesState: {
          ...state.boxesState,
          [boxType]: [
            ...state.boxesState[boxType],
            { type, name, inBox: true },
          ],
        },
        chooseButtonList: state.chooseButtonList.filter(
          (item) => item.name !== name
        ),
      }));

      const timeout = setTimeout(
        () => moveBackToList(type, name),
        TIMEOUT_DURATION
      );
      set((state) => ({
        timeouts: { ...state.timeouts, [name]: timeout },
      }));
    };

    const isInChooseList = state.chooseButtonList.some(
      (item) => item.name === name
    );
    const isInBox = Object.values(state.boxesState).some((box) =>
      box.some((item) => item.name === name)
    );

    if (isInChooseList) {
      handleMoveToBox();
    } else if (isInBox) {
      moveBackToList(type, name);
    }
  },
}));
