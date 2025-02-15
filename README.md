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

## Contributing

We welcome contributions to CatType! Here's how you can help make this project better.

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/cattype.git
cd cattype
```
3. Install dependencies:
```bash
pnpm install
```
4. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

### Contributing Guidelines

#### General Guidelines

1. Ensure your code follows the existing style and conventions
2. Write clear, descriptive commit messages
3. Keep pull requests focused on a single feature or bug fix
4. Add appropriate documentation for new features
5. Make sure your changes don't break existing functionality
6. Test your changes thoroughly before submitting

#### Contributing Themes

1. Open `lib/themes.ts`
2. Add your theme following the structure provided above
3. Ensure your theme:
   - Has a unique ID
   - Uses descriptive and appropriate color names
   - Maintains good contrast ratios for accessibility
   - Includes all required color properties
4. Test your theme with different code snippets and UI elements

#### Contributing Code Snippets

1. Open `lib/code-snippets.ts`
2. Add your snippet following the structure provided above
3. Ensure your snippet:
   - Has a unique ID
   - Uses appropriate difficulty classification
   - Contains well-formatted, clean code
   - Represents real-world programming scenarios
   - Is neither too short nor too long (ideally 5-15 lines)
   - Includes proper syntax highlighting support

#### Contributing to Core Features

1. Check the existing issues or create a new one describing your proposed feature
2. Discuss the implementation approach in the issue
3. Follow the project's architecture and patterns
4. Add necessary tests for new functionality
5. Update documentation as needed
6. Ensure the development server runs without errors

### Submitting Changes

1. Push your changes to your fork
2. Create a Pull Request (PR) to the main repository
3. In your PR description:
   - Clearly describe the changes
   - Reference any related issues
   - Include screenshots for UI changes
   - List any new dependencies added
4. Wait for review and address any feedback

### Need Help?

If you need help or have questions:
- Open an issue for bugs or feature discussions
- Be clear and descriptive in your communications
- Provide as much relevant information as possible

Thank you for contributing to CatType!