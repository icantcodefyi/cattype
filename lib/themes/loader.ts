import { Theme } from './types';
import { themeRegistry } from './registry';

export function generateThemeVariables(theme: Theme): Record<string, string> {
  const variables: Record<string, string> = {};
  
  // Convert hex colors to HSL
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (value.startsWith('#')) {
      const hsl = hexToHSL(value);
      variables[`--${key}`] = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
    } else {
      variables[`--${key}`] = value;
    }
  });

  // Add any custom variables
  if (theme.variables) {
    Object.entries(theme.variables).forEach(([key, value]) => {
      variables[`--${key}`] = value;
    });
  }

  return variables;
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function loadTheme(theme: Theme, categoryName: string) {
  try {
    // Validate theme structure
    if (!theme.id || !theme.name || !theme.colors) {
      throw new Error('Invalid theme structure');
    }

    // Add theme to registry
    themeRegistry.addTheme(theme, categoryName);

    // Skip DOM manipulation during SSR
    if (typeof window === 'undefined') {
      return true;
    }

    // Generate CSS variables
    const variables = generateThemeVariables(theme);

    // Create style element for the theme
    const styleId = `theme-${theme.id}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Create CSS rules
    const css = `
      [data-theme="${theme.id}"] {
        ${Object.entries(variables)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
    `;

    styleEl.textContent = css;

    return true;
  } catch (error) {
    console.error(`Failed to load theme: ${error}`);
    return false;
  }
}

export function unloadTheme(themeId: string) {
  // Skip DOM manipulation during SSR
  if (typeof window === 'undefined') {
    return themeRegistry.removeTheme(themeId);
  }

  const styleEl = document.getElementById(`theme-${themeId}`);
  if (styleEl) {
    styleEl.remove();
  }
  return themeRegistry.removeTheme(themeId);
} 