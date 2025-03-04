import { COLOR_SCHEMES } from "../constants/colors";

export const getColorScheme = (type: string): string => {
  const scheme = COLOR_SCHEMES[type.toLowerCase()] || COLOR_SCHEMES.default;
  return `${scheme.background} ${scheme.text} ${scheme.hover}`;
};

export const getTypeStyles = getColorScheme;
