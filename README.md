# CatType - A Typing Practice App

A modern, customizable typing practice application with multiple themes and coding snippets.

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Customization

### Adding New Themes

You can add new themes by modifying `lib/themes/default-themes.ts`. Each theme follows this structure:

```typescript
{
  theme: {
    name: "Your Theme Name",
    id: "your-theme-id",
    author: "Your Name",
    description: "Theme description",
    colors: {
      background: "#hex-color",
      foreground: "#hex-color",
      card: "#hex-color",
      "card-foreground": "#hex-color",
      popover: "#hex-color",
      "popover-foreground": "#hex-color",
      primary: "#hex-color",
      "primary-foreground": "#hex-color",
      secondary: "#hex-color",
      "secondary-foreground": "#hex-color",
      muted: "#hex-color",
      "muted-foreground": "#hex-color",
      accent: "#hex-color",
      "accent-foreground": "#hex-color",
      destructive: "#hex-color",
      "destructive-foreground": "#hex-color",
      border: "#hex-color",
      input: "#hex-color",
      ring: "#hex-color"
    }
  },
  category: "Dark" | "Light" | "Special"
}
```

### Adding New Code Snippets

You can add new coding problems by modifying `lib/code-snippets.ts`. Each snippet follows this structure:

```typescript
{
  id: "unique-id",
  language: "Programming Language",
  name: "Snippet Name",
  difficulty: "easy" | "medium" | "hard",
  code: "Your code snippet here"
}
```

Note: When adding code snippets, make sure to:
- Use a unique ID for each snippet
- Properly escape special characters in the code
- Choose an appropriate difficulty level
- Format the code consistently

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.