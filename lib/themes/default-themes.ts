import { Theme } from './types';

export const defaultThemes: { theme: Theme; category: string }[] = [
  // Dark Themes
  {
    theme: {
      name: "Classic Dark",
      id: "classic-dark",
      author: "Ani",
      description: "The default dark theme",
      colors: {
        background: "#323437",
        foreground: "#d1d0c5",
        card: "#323437",
        "card-foreground": "#d1d0c5",
        popover: "#323437",
        "popover-foreground": "#d1d0c5",
        primary: "#d1d0c5",
        "primary-foreground": "#323437",
        secondary: "#2c2e31",
        "secondary-foreground": "#d1d0c5",
        muted: "#2c2e31",
        "muted-foreground": "#646669",
        accent: "#2c2e31",
        "accent-foreground": "#d1d0c5",
        destructive: "#ff6b6b",
        "destructive-foreground": "#ffffff",
        border: "#2c2e31",
        input: "#2c2e31",
        ring: "#d1d0c5"
      }
    },
    category: "Dark"
  },
  {
    theme: {
      name: "Monokai",
      id: "monokai",
      author: "Ani",
      description: "Monokai-inspired dark theme",
      colors: {
        background: "#272822",
        foreground: "#f8f8f2",
        card: "#272822",
        "card-foreground": "#f8f8f2",
        popover: "#272822",
        "popover-foreground": "#f8f8f2",
        primary: "#a6e22e",
        "primary-foreground": "#272822",
        secondary: "#1e1f1c",
        "secondary-foreground": "#a6e22e",
        muted: "#1e1f1c",
        "muted-foreground": "#75715e",
        accent: "#1e1f1c",
        "accent-foreground": "#a6e22e",
        destructive: "#f92672",
        "destructive-foreground": "#ffffff",
        border: "#1e1f1c",
        input: "#1e1f1c",
        ring: "#a6e22e"
      }
    },
    category: "Dark"
  },
  {
    theme: {
      name: "Dracula",
      id: "dracula",
      author: "Ani",
      description: "Dracula color scheme",
      colors: {
        background: "#282a36",
        foreground: "#f8f8f2",
        card: "#282a36",
        "card-foreground": "#f8f8f2",
        popover: "#282a36",
        "popover-foreground": "#f8f8f2",
        primary: "#bd93f9",
        "primary-foreground": "#282a36",
        secondary: "#44475a",
        "secondary-foreground": "#bd93f9",
        muted: "#44475a",
        "muted-foreground": "#6272a4",
        accent: "#44475a",
        "accent-foreground": "#bd93f9",
        destructive: "#ff5555",
        "destructive-foreground": "#ffffff",
        border: "#44475a",
        input: "#44475a",
        ring: "#bd93f9"
      }
    },
    category: "Dark"
  },
  {
    theme: {
      name: "Nord",
      id: "nord",
      author: "Ani",
      description: "Nord color scheme",
      colors: {
        background: "#2e3440",
        foreground: "#d8dee9",
        card: "#2e3440",
        "card-foreground": "#d8dee9",
        popover: "#2e3440",
        "popover-foreground": "#d8dee9",
        primary: "#88c0d0",
        "primary-foreground": "#2e3440",
        secondary: "#3b4252",
        "secondary-foreground": "#88c0d0",
        muted: "#3b4252",
        "muted-foreground": "#4c566a",
        accent: "#3b4252",
        "accent-foreground": "#88c0d0",
        destructive: "#bf616a",
        "destructive-foreground": "#ffffff",
        border: "#3b4252",
        input: "#3b4252",
        ring: "#88c0d0"
      }
    },
    category: "Dark"
  },
  {
    theme: {
      name: "Tokyo Night",
      id: "tokyo-night",
      author: "Ani",
      description: "Tokyo Night-inspired dark theme",
      colors: {
        background: "#1a1b26",
        foreground: "#a9b1d6",
        card: "#1a1b26",
        "card-foreground": "#a9b1d6",
        popover: "#1a1b26",
        "popover-foreground": "#a9b1d6",
        primary: "#7aa2f7",
        "primary-foreground": "#1a1b26",
        secondary: "#24283b",
        "secondary-foreground": "#7aa2f7",
        muted: "#24283b",
        "muted-foreground": "#565f89",
        accent: "#24283b",
        "accent-foreground": "#7aa2f7",
        destructive: "#f7768e",
        "destructive-foreground": "#ffffff",
        border: "#24283b",
        input: "#24283b",
        ring: "#7aa2f7"
      }
    },
    category: "Dark"
  },
  {
    theme: {
      name: "Midnight Ocean",
      id: "midnight-ocean",
      author: "Buddhsen",
      description: "Deep ocean-inspired dark theme with subtle blue accents",
      colors: {
        background: "#0A192F",
        foreground: "#E6F1FF",
        card: "#0A192F",
        "card-foreground": "#E6F1FF",
        popover: "#0A192F",
        "popover-foreground": "#E6F1FF",
        primary: "#64FFDA",
        "primary-foreground": "#0A192F",
        secondary: "#112240",
        "secondary-foreground": "#64FFDA",
        muted: "#112240",
        "muted-foreground": "#8892B0",
        accent: "#112240",
        "accent-foreground": "#64FFDA",
        destructive: "#FF5470",
        "destructive-foreground": "#ffffff",
        border: "#112240",
        input: "#112240",
        ring: "#64FFDA"
      }
    },
    category: "Dark"
  },
  // Light Themes
  {
    theme: {
      name: "Classic Light",
      id: "classic-light",
      author: "Ani",
      description: "Clean light theme",
      colors: {
        background: "#ffffff",
        foreground: "#1a1a1a",
        card: "#ffffff",
        "card-foreground": "#1a1a1a",
        popover: "#ffffff",
        "popover-foreground": "#1a1a1a",
        primary: "#0066cc",
        "primary-foreground": "#ffffff",
        secondary: "#f4f4f4",
        "secondary-foreground": "#1a1a1a",
        muted: "#f4f4f4",
        "muted-foreground": "#666666",
        accent: "#f4f4f4",
        "accent-foreground": "#0066cc",
        destructive: "#dc2626",
        "destructive-foreground": "#ffffff",
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#0066cc"
      }
    },
    category: "Light"
  },
  // Special Themes
  {
    theme: {
      name: "Synthwave",
      id: "synthwave",
      author: "Ani",
      description: "Retro synthwave aesthetic",
      colors: {
        background: "#2b213a",
        foreground: "#ff7edb",
        card: "#2b213a",
        "card-foreground": "#ff7edb",
        popover: "#2b213a",
        "popover-foreground": "#ff7edb",
        primary: "#f92aad",
        "primary-foreground": "#2b213a",
        secondary: "#241b2f",
        "secondary-foreground": "#f92aad",
        muted: "#241b2f",
        "muted-foreground": "#a288d9",
        accent: "#241b2f",
        "accent-foreground": "#f92aad",
        destructive: "#ff1744",
        "destructive-foreground": "#ffffff",
        border: "#241b2f",
        input: "#241b2f",
        ring: "#f92aad"
      }
    },
    category: "Special"
  },
  {
    theme: {
      name: "Forest",
      id: "forest",
      author: "Ani",
      description: "Nature-inspired green theme",
      colors: {
        background: "#1b2721",
        foreground: "#a8c5b0",
        card: "#1b2721",
        "card-foreground": "#a8c5b0",
        popover: "#1b2721",
        "popover-foreground": "#a8c5b0",
        primary: "#4ca771",
        "primary-foreground": "#1b2721",
        secondary: "#1a231e",
        "secondary-foreground": "#4ca771",
        muted: "#1a231e",
        "muted-foreground": "#63876c",
        accent: "#1a231e",
        "accent-foreground": "#4ca771",
        destructive: "#e66767",
        "destructive-foreground": "#ffffff",
        border: "#1a231e",
        input: "#1a231e",
        ring: "#4ca771"
      }
    },
    category: "Special"
  },
  {
    theme: {
      name: "Nebula",
      id: "nebula",
      author: "Buddhsen",
      description: "Deep space nebula with cosmic auroras theme",
      colors: {
        background: "#0B1026",         
        foreground: "#E4F1FF",         
        card: "#0B1026",
        "card-foreground": "#E4F1FF",
        popover: "#0B1026",
        "popover-foreground": "#E4F1FF",
        primary: "#64E6FF",             
        "primary-foreground": "#0B1026",
        secondary: "#162040",           
        "secondary-foreground": "#64E6FF",
        muted: "#162040",
        "muted-foreground": "#7B8EBE",  
        accent: "#162040",
        "accent-foreground": "#FF61D8", 
        destructive: "#FF3D71",        
        "destructive-foreground": "#ffffff",
        border: "#162040",
        input: "#162040",
        ring: "#64E6FF"
      }
    },
    category: "Special"
  }
]; 