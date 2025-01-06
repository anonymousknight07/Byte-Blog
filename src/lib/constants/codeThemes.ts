import { PrismTheme } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const themes: Record<'light' | 'dark', PrismTheme> = {
  dark: vscDarkPlus,
  light: oneLight,
};