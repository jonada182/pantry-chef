import { Theme, ThemeName, Themes } from "./types";

export const themes: Themes = { primary: { backgroundColour: "bg-primary",
  textColour: "text-black",
  roleColour: "",
  animation: "" },
secondary: { backgroundColour: "bg-gray-900",
  textColour: "text-white",
  roleColour: "text-primary",
  animation: "" },
neutral: { backgroundColour: "bg-gray-500",
  textColour: "text-white",
  roleColour: "",
  animation: "animate-pulse" } };

export const getTheme = (themeName: ThemeName): Theme => {
  return themes[themeName];
};
