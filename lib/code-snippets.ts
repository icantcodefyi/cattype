export type CodeSnippet = {
  id: string;
  language: string;
  name: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export function getRandomSnippet(): CodeSnippet {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  return codeSnippets[randomIndex];
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'js-fibonacci',
    language: 'JavaScript',
    name: 'Fibonacci',
    difficulty: 'easy',
    code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}'
  },
  {
    id: 'py-quicksort',
    language: 'Python',
    name: 'Quick Sort',
    difficulty: 'medium',
    code: 'def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)'
  },
  {
    id: 'js-promises',
    language: 'JavaScript',
    name: 'Promise Chain',
    difficulty: 'medium',
    code: 'function fetchData() {\n  return fetch("https://api.example.com/data")\n    .then(response => response.json())\n    .then(data => processData(data))\n    .catch(error => console.error(error));\n}'
  },
  {
    id: 'py-decorator',
    language: 'Python',
    name: 'Decorator Pattern',
    difficulty: 'hard',
    code: 'def timer_decorator(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"{func.__name__} took {end-start} seconds")\n        return result\n    return wrapper'
  },
  {
    id: 'ts-generics',
    language: 'TypeScript',
    name: 'Generic Stack',
    difficulty: 'medium',
    code: 'class Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n}'
  },
  {
    id: 'py-generator',
    language: 'Python',
    name: 'Infinite Generator',
    difficulty: 'easy',
    code: 'def infinite_sequence():\n    num = 0\n    while True:\n        yield num\n        num += 1'
  },
  {
    id: 'js-debounce',
    language: 'JavaScript',
    name: 'Debounce Function',
    difficulty: 'hard',
    code: 'function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}'
  },
  {
    id: 'ts-observer',
    language: 'TypeScript',
    name: 'Observer Pattern',
    difficulty: 'hard',
    code: 'interface Observer {\n  update(data: any): void;\n}\n\nclass Subject {\n  private observers: Observer[] = [];\n\n  addObserver(observer: Observer): void {\n    this.observers.push(observer);\n  }\n\n  notify(data: any): void {\n    this.observers.forEach(observer => observer.update(data));\n  }\n}'
  },
  {
    id: 'py-binary-search',
    language: 'Python',
    name: 'Binary Search',
    difficulty: 'medium',
    code: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1'
  },
  {
    id: 'ts-memoize',
    language: 'TypeScript',
    name: 'Memoization',
    difficulty: 'medium',
    code: 'function memoize<T, R>(fn: (...args: T[]) => R): (...args: T[]) => R {\n  const cache = new Map<string, R>();\n  return (...args: T[]): R => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key)!;\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}'
  },
  {
    id: 'js-curry',
    language: 'JavaScript',
    name: 'Currying',
    difficulty: 'hard',
    code: 'function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...moreArgs) {\n      return curried.apply(this, args.concat(moreArgs));\n    };\n  };\n}'
  },
  {
    id: 'py-context-manager',
    language: 'Python',
    name: 'Context Manager',
    difficulty: 'medium',
    code: 'class Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self\n\n    def __exit__(self, *args):\n        self.end = time.time()\n        self.duration = self.end - self.start\n        print(f"Duration: {self.duration:.2f} seconds")'
  }
]; 