import { Theme, ThemeCategory } from './types';

class ThemeRegistry {
  private categories: Map<string, ThemeCategory>;

  constructor() {
    this.categories = new Map();
    this.initializeDefaultCategories();
  }

  private initializeDefaultCategories() {
    this.addCategory({
      name: 'Dark',
      description: 'Dark themes for low-light environments',
      themes: []
    });

    this.addCategory({
      name: 'Light',
      description: 'Light themes for bright environments',
      themes: []
    });

    this.addCategory({
      name: 'Special',
      description: 'Special themes with unique color schemes',
      themes: []
    });
  }

  addCategory(category: ThemeCategory) {
    this.categories.set(category.name.toLowerCase(), category);
  }

  getCategory(name: string): ThemeCategory | undefined {
    return this.categories.get(name.toLowerCase());
  }

  getAllCategories(): ThemeCategory[] {
    return Array.from(this.categories.values());
  }

  addTheme(theme: Theme, categoryName: string) {
    const category = this.getCategory(categoryName);
    if (!category) {
      throw new Error(`Category "${categoryName}" not found`);
    }
    
    // Check if theme with same ID already exists
    const existingThemeIndex = category.themes.findIndex(t => t.id === theme.id);
    if (existingThemeIndex !== -1) {
      // Update existing theme
      category.themes[existingThemeIndex] = theme;
    } else {
      // Add new theme
      category.themes.push(theme);
    }
  }

  getTheme(themeId: string): Theme | undefined {
    for (const category of this.categories.values()) {
      const theme = category.themes.find(t => t.id === themeId);
      if (theme) return theme;
    }
    return undefined;
  }

  getAllThemes(): Theme[] {
    const themes: Theme[] = [];
    for (const category of this.categories.values()) {
      themes.push(...category.themes);
    }
    return themes;
  }

  removeTheme(themeId: string): boolean {
    for (const category of this.categories.values()) {
      const index = category.themes.findIndex(t => t.id === themeId);
      if (index !== -1) {
        category.themes.splice(index, 1);
        return true;
      }
    }
    return false;
  }
}

export const themeRegistry = new ThemeRegistry(); 