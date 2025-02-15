export type Theme = {
  name: string;
  id: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
  };
};

export const themes: Theme[] = [
  {
    name: "Classic Dark",
    id: "classic-dark",
    colors: {
      background: "#323437",
      text: "#646669",
      primary: "#d1d0c5",
      secondary: "#2c2e31",
      accent: "#e2b714"
    }
  },
  {
    name: "Monokai",
    id: "monokai",
    colors: {
      background: "#272822",
      text: "#f8f8f2",
      primary: "#a6e22e",
      secondary: "#1e1f1c",
      accent: "#fd971f"
    }
  },
  {
    name: "Dracula",
    id: "dracula",
    colors: {
      background: "#282a36",
      text: "#f8f8f2",
      primary: "#bd93f9",
      secondary: "#44475a",
      accent: "#ff79c6"
    }
  },
  {
    name: "Nord",
    id: "nord",
    colors: {
      background: "#2e3440",
      text: "#d8dee9",
      primary: "#88c0d0",
      secondary: "#3b4252",
      accent: "#ebcb8b"
    }
  }
]; 