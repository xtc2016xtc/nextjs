// 导入调色版
// eslint-disable-next-line
import { Palette, PaletteColor }  from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette"{
  interface PaletteColor {
    [Key:number]:string;
  }

  interface Palette {
    tertiary:PaletteColor;
  }
}