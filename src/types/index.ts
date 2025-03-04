export interface Item {
  type: string;
  name: string;
  inBox: boolean;
}

export interface BoxState {
  [key: string]: Item[];
}

export interface ColorConfig {
  bg: string;
  hoverBg: string;
  text: string;
}

export interface TypeColors {
  [key: string]: ColorConfig;
}
