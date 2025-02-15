export type CodeSnippet = {
  id: string;
  language: string;
  name: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

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
  }
]; 