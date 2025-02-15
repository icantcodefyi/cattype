import { CodeSnippet } from './code-snippets';

export interface IndentationRule {
  // Characters that trigger an increase in indentation on the next line
  increaseNextIndentTriggers: string[];
  // Characters that trigger an increase in indentation on the current line
  increaseCurrentIndentTriggers: string[];
  // Characters that should decrease indentation
  decreaseIndentTriggers: string[];
  // Characters that should prevent indentation increase
  preventIndentationTriggers?: string[];
  // The indentation string to use (e.g., '  ' for 2 spaces, '\t' for tabs)
  indentationString: string;
  // Special cases for the language (e.g., Python's elif/else alignment)
  specialCases?: {
    pattern: RegExp;
    action: 'maintain' | 'decrease';
  }[];
}

export const languageIndentationRules: Record<string, IndentationRule> = {
  'JavaScript': {
    increaseNextIndentTriggers: ['{', '(', '['],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['}', ')', ']'],
    preventIndentationTriggers: [';'],
    indentationString: '  ',
    specialCases: [
      {
        // Don't increase indent after single-line statements ending with semicolon
        pattern: /^[^{([\n]*;$/,
        action: 'maintain'
      },
      {
        // Don't increase indent for single-line if/for/while statements
        pattern: /^(?:if|for|while)\s*\([^)]*\)[^{]*$/,
        action: 'maintain'
      },
      {
        // Maintain indentation for chained methods
        pattern: /^\s*\.\w+/,
        action: 'maintain'
      }
    ]
  },
  'TypeScript': {
    increaseNextIndentTriggers: ['{', '(', '['],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['}', ')', ']'],
    preventIndentationTriggers: [';'],
    indentationString: '  ',
    specialCases: [
      {
        // Don't increase indent after single-line statements ending with semicolon
        pattern: /^[^{([\n]*;$/,
        action: 'maintain'
      },
      {
        // Don't increase indent for single-line if/for/while statements
        pattern: /^(?:if|for|while)\s*\([^)]*\)[^{]*$/,
        action: 'maintain'
      },
      {
        // Maintain indentation for chained methods
        pattern: /^\s*\.\w+/,
        action: 'maintain'
      },
      {
        // Maintain indentation for type definitions
        pattern: /^[^{]*:\s*[A-Z]\w+[^{]*$/,
        action: 'maintain'
      }
    ]
  },
  'Python': {
    increaseNextIndentTriggers: [':'],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: [],
    indentationString: '    ',
    specialCases: [
      {
        // Handle elif/else/except/finally cases
        pattern: /^(\s*)(elif|else|except|finally).*:/,
        action: 'maintain'
      },
      {
        // Handle closing of multi-line structures
        pattern: /^(\s*)(return|break|continue|pass|raise)/,
        action: 'decrease'
      }
    ]
  },
  'Rust': {
    increaseNextIndentTriggers: ['{', '(', '['],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['}', ')', ']'],
    indentationString: '    ',
  },
  'Go': {
    increaseNextIndentTriggers: ['{'],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['}'],
    indentationString: '\t',
  },
  'Java': {
    increaseNextIndentTriggers: ['{', '(', '['],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['}', ')', ']'],
    indentationString: '    ',
  },
  'C++': {
    increaseNextIndentTriggers: ['{', '(', '['],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['}', ')', ']'],
    indentationString: '    ',
  },
  'Ruby': {
    increaseNextIndentTriggers: ['do', 'class', 'module', 'def', 'if', 'unless', 'case', 'while', 'until', 'for', 'begin'],
    increaseCurrentIndentTriggers: [],
    decreaseIndentTriggers: ['end'],
    indentationString: '  ',
  }
};

export function getIndentationForLanguage(snippet: CodeSnippet): IndentationRule {
  return languageIndentationRules[snippet.language] || languageIndentationRules['JavaScript'];
}

export function calculateIndentation(
  text: string,
  position: number,
  rule: IndentationRule
): { indentation: string; shouldIncrease: boolean } {
  // Get the current line's content up to the cursor
  const lastNewLine = text.lastIndexOf('\n', position - 1);
  const currentLine = text.slice(lastNewLine + 1, position);
  
  // Get the base indentation from the current line
  const baseIndentMatch = currentLine.match(/^\s*/);
  const baseIndent = baseIndentMatch ? baseIndentMatch[0] : '';

  // Check if the line ends with a prevent indentation trigger
  if (rule.preventIndentationTriggers?.some(trigger => 
    currentLine.trimRight().endsWith(trigger)
  )) {
    return {
      indentation: baseIndent,
      shouldIncrease: false
    };
  }
  
  // Check for special cases first
  if (rule.specialCases) {
    for (const specialCase of rule.specialCases) {
      if (specialCase.pattern.test(currentLine.trim())) {
        if (specialCase.action === 'decrease') {
          return {
            indentation: baseIndent.slice(rule.indentationString.length),
            shouldIncrease: false
          };
        } else if (specialCase.action === 'maintain') {
          return {
            indentation: baseIndent,
            shouldIncrease: false
          };
        }
      }
    }
  }

  // Check if we should increase indentation based on the current line
  const shouldIncrease = rule.increaseNextIndentTriggers.some(trigger => {
    if (trigger.length === 1) {
      // For single-character triggers, check if they exist and aren't followed by a closing pair
      if (currentLine.includes(trigger)) {
        const triggerIndex = currentLine.lastIndexOf(trigger);
        const restOfLine = currentLine.slice(triggerIndex + 1).trim();
        // Don't increase indent if it's a complete pair on the same line
        if (trigger === '{' && restOfLine.startsWith('}')) return false;
        if (trigger === '(' && restOfLine.startsWith(')')) return false;
        if (trigger === '[' && restOfLine.startsWith(']')) return false;
        return true;
      }
      return false;
    } else {
      // For word triggers (like in Ruby)
      const regex = new RegExp(`\\b${trigger}\\b`);
      return regex.test(currentLine);
    }
  });

  // Check if we should decrease indentation based on the current line
  const shouldDecrease = rule.decreaseIndentTriggers.some(trigger => 
    currentLine.trimLeft().startsWith(trigger)
  );

  if (shouldDecrease) {
    return {
      indentation: baseIndent.slice(rule.indentationString.length),
      shouldIncrease: false
    };
  }

  return {
    indentation: baseIndent,
    shouldIncrease
  };
} 