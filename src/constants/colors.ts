export interface ColorScheme {
  background: string;
  text: string;
  hover: string;
}

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  fruit: {
    background: "bg-red-100",
    text: "text-red-700",
    hover: "hover:bg-red-200",
  },
  vegetable: {
    background: "bg-green-100",
    text: "text-green-700",
    hover: "hover:bg-green-200",
  },
  default: {
    background: "bg-gray-100",
    text: "text-gray-700",
    hover: "hover:bg-gray-200",
  },
};
