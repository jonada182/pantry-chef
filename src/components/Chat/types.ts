export enum ThemeSlug {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  NEUTRAL = "neutral",
}

export type ThemeName = ThemeSlug.PRIMARY | ThemeSlug.SECONDARY | ThemeSlug.NEUTRAL;

export type Theme = {
  backgroundColour: string;
  textColour: string;
  roleColour?: string;
  animation?: boolean;
};

export type Themes = {
  [key in ThemeName]: Theme;
};
