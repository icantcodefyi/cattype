export type CodeSnippet = {
  id: string;
  language: string;
  name: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

const catParagraphs = [
  "In the bustling city of Whiskertown, there lived a remarkable cat named Luna who had mastered the art of typing. Every evening, she would sit at her owner's computer, her paws dancing gracefully across the keyboard as she composed poetry about her daily adventures. Other cats in the neighborhood would gather by the window, watching in amazement as Luna's stories came to life on the screen.",
  "The Cat Cafe on Purrington Street was famous for its unique approach to customer service. Each table had its own feline typing assistant who would take orders by tapping on specially designed keyboards. The café's star employee, a ginger cat named Oliver, could type sixty words per minute and never missed an order. Customers would travel from far and wide just to watch him work.",
  "Professor Whiskers was known throughout the university for her innovative teaching methods. Instead of traditional lectures, she taught her students the art of quick and accurate typing through a series of playful exercises. Her classroom was filled with the gentle sound of keyboards clicking as students practiced their skills, inspired by her tales of ancient cats who communicated through elaborate paw movements.",
  "The annual Feline Typing Championship was the most anticipated event in Pawsville. Cats from all corners of the world would gather to showcase their typing prowess, their paws flying across keyboards with incredible speed and precision. This year's favorite was a sleek Siamese named Jazz, who had developed a unique technique involving both paws and tail for maximum efficiency.",
  "Deep in Silicon Valley, a team of tech-savvy cats had developed a revolutionary keyboard designed specifically for feline users. The prototype, tested by a diverse group of cats, featured cushioned keys and ergonomic paw rests. Early results were promising, with test subjects reporting increased typing speeds and decreased paw fatigue. The future of feline typing had never looked brighter."
];

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
    id: 'text-random',
    language: 'Text',
    name: 'Random Story',
    difficulty: 'medium',
    code: catParagraphs[Math.floor(Math.random() * catParagraphs.length)]
  },
  {
    id: 'bubble-sort',
    language: 'C++',
    name: 'Bubble Sort',
    difficulty: 'medium',
    code: 'void bubbleSort(vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (v[j] > v[j + 1]){\n                swap(v[j], v[j + 1]);\n            }\n        }\n    }\n}'
  },
  {
	id : 'isPalindrome',
	language: 'C++',
	name: 'Check for Palindrome',
	difficulty: 'medium',
	code : 'string isPalindrome(string str){\n    string rev = s;\n    reverse(rev.begin(), rev.end());\n    if (str == rev) {\n        cout << str << " is Palindrome";\n    }\n    else {\n        cout << str << " is not a Palindrome";\n    }\n}'
  },

  {
	id : 'binary-search',
	language : 'C++',
	name : 'Binary Search',
	difficulty : 'hard',
	code : 'int BinarySearch(int nums[], int k) {\n    int n = nums.size();\n    int high = nums[0];\n    int low = nums[n-1];\n    while (high >= low){\n        int mid = (low+mid)/2;\n        if(nums[mid] == x)  {\n            return arr[mid];\n        }\n        else if (x > nums[mid]) {\n            low = mid+1;\n        }\n        else {\n            high = mid-1;\n        }\n    }\n    return -1;\n}'
  }

]; 

