export type CodeSnippet = {
  id: string;
  language: string;
  name: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  keywords: string[];
};

const catParagraphs = [
  "In the bustling city of Whiskertown, there lived a remarkable cat named Luna who had mastered the art of typing. Every evening, she would sit at her owner's computer, her paws dancing gracefully across the keyboard as she composed poetry about her daily adventures. Other cats in the neighborhood would gather by the window, watching in amazement as Luna's stories came to life on the screen.",
  "The Cat Cafe on Purrington Street was famous for its unique approach to customer service. Each table had its own feline typing assistant who would take orders by tapping on specially designed keyboards. The café's star employee, a ginger cat named Oliver, could type sixty words per minute and never missed an order. Customers would travel from far and wide just to watch him work.",
  "Professor Whiskers was known throughout the university for her innovative teaching methods. Instead of traditional lectures, she taught her students the art of quick and accurate typing through a series of playful exercises. Her classroom was filled with the gentle sound of keyboards clicking as students practiced their skills, inspired by her tales of ancient cats who communicated through elaborate paw movements.",
  "The annual Feline Typing Championship was the most anticipated event in Pawsville. Cats from all corners of the world would gather to showcase their typing prowess, their paws flying across keyboards with incredible speed and precision. This year's favorite was a sleek Siamese named Jazz, who had developed a unique technique involving both paws and tail for maximum efficiency.",
  "Deep in Silicon Valley, a team of tech-savvy cats had developed a revolutionary keyboard designed specifically for feline users. The prototype, tested by a diverse group of cats, featured cushioned keys and ergonomic paw rests. Early results were promising, with test subjects reporting increased typing speeds and decreased paw fatigue. The future of feline typing had never looked brighter."
];

// Helper function to generate multiple language variants of the same algorithm
function generateLanguageVariants(
  baseName: string,
  implementations: { [key: string]: string },
  category: string,
  baseKeywords: string[],
  difficulty: 'easy' | 'medium' | 'hard'
): CodeSnippet[] {
  return Object.entries(implementations).map(([language, code]) => ({
    id: `${language.toLowerCase()}-${baseName.toLowerCase().replace(/\s+/g, '-')}`,
    language,
    name: baseName,
    code,
    difficulty,
    category,
    keywords: [...baseKeywords, language.toLowerCase()]
  }));
}

// Common algorithms implementations
const algorithmImplementations = {
  fibonacci: {
    JavaScript: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
    Python: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)',
    TypeScript: 'function fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
    Ruby: 'def fibonacci(n)\n  return n if n <= 1\n  fibonacci(n - 1) + fibonacci(n - 2)\nend',
    'C++': 'int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}',
    Java: 'public static int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}',
    Go: 'func fibonacci(n int) int {\n    if n <= 1 {\n        return n\n    }\n    return fibonacci(n-1) + fibonacci(n-2)\n}',
    Rust: 'fn fibonacci(n: u32) -> u32 {\n    if n <= 1 {\n        return n;\n    }\n    fibonacci(n - 1) + fibonacci(n - 2)\n}'
  },
  quickSort: {
    JavaScript: 'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}',
    Python: 'def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)',
    TypeScript: 'function quickSort<T>(arr: T[]): T[] {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}',
    Ruby: 'def quick_sort(arr)\n  return arr if arr.length <= 1\n  pivot = arr[arr.length / 2]\n  left = arr.select { |x| x < pivot }\n  middle = arr.select { |x| x == pivot }\n  right = arr.select { |x| x > pivot }\n  quick_sort(left) + middle + quick_sort(right)\nend',
    'C++': 'vector<int> quickSort(vector<int>& arr) {\n    if (arr.size() <= 1) return arr;\n    int pivot = arr[arr.size() / 2];\n    vector<int> left, middle, right;\n    for (int x : arr) {\n        if (x < pivot) left.push_back(x);\n        else if (x == pivot) middle.push_back(x);\n        else right.push_back(x);\n    }\n    auto sorted_left = quickSort(left);\n    auto sorted_right = quickSort(right);\n    sorted_left.insert(sorted_left.end(), middle.begin(), middle.end());\n    sorted_left.insert(sorted_left.end(), sorted_right.begin(), sorted_right.end());\n    return sorted_left;\n}',
    Java: 'public static List<Integer> quickSort(List<Integer> arr) {\n    if (arr.size() <= 1) return arr;\n    Integer pivot = arr.get(arr.size() / 2);\n    List<Integer> left = arr.stream().filter(x -> x < pivot).collect(Collectors.toList());\n    List<Integer> middle = arr.stream().filter(x -> x.equals(pivot)).collect(Collectors.toList());\n    List<Integer> right = arr.stream().filter(x -> x > pivot).collect(Collectors.toList());\n    List<Integer> result = new ArrayList<>();\n    result.addAll(quickSort(left));\n    result.addAll(middle);\n    result.addAll(quickSort(right));\n    return result;\n}',
    Go: 'func quickSort(arr []int) []int {\n    if len(arr) <= 1 {\n        return arr\n    }\n    pivot := arr[len(arr)/2]\n    var left, middle, right []int\n    for _, x := range arr {\n        if x < pivot {\n            left = append(left, x)\n        } else if x == pivot {\n            middle = append(middle, x)\n        } else {\n            right = append(right, x)\n        }\n    }\n    result := append(quickSort(left), middle...)\n    return append(result, quickSort(right)...)\n}',
    Rust: 'fn quick_sort(arr: &mut Vec<i32>) -> Vec<i32> {\n    if arr.len() <= 1 {\n        return arr.to_vec();\n    }\n    let pivot = arr[arr.len() / 2];\n    let mut left: Vec<i32> = arr.iter().filter(|&&x| x < pivot).cloned().collect();\n    let middle: Vec<i32> = arr.iter().filter(|&&x| x == pivot).cloned().collect();\n    let mut right: Vec<i32> = arr.iter().filter(|&&x| x > pivot).cloned().collect();\n    let mut result = quick_sort(&mut left);\n    result.extend(middle);\n    result.extend(quick_sort(&mut right));\n    result\n}'
  },
  mergeSort: {
    JavaScript: 'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) {\n      result.push(left[i++]);\n    } else {\n      result.push(right[j++]);\n    }\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}',
    Python: 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result',
    TypeScript: 'function mergeSort<T>(arr: T[]): T[] {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge<T>(left: T[], right: T[]): T[] {\n  const result: T[] = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) {\n      result.push(left[i++]);\n    } else {\n      result.push(right[j++]);\n    }\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}',
    Java: 'public static <T extends Comparable<T>> List<T> mergeSort(List<T> arr) {\n    if (arr.size() <= 1) return arr;\n    int mid = arr.size() / 2;\n    List<T> left = mergeSort(arr.subList(0, mid));\n    List<T> right = mergeSort(arr.subList(mid, arr.size()));\n    return merge(left, right);\n}\n\nprivate static <T extends Comparable<T>> List<T> merge(List<T> left, List<T> right) {\n    List<T> result = new ArrayList<>();\n    int i = 0, j = 0;\n    while (i < left.size() && j < right.size()) {\n        if (left.get(i).compareTo(right.get(j)) <= 0) {\n            result.add(left.get(i++));\n        } else {\n            result.add(right.get(j++));\n        }\n    }\n    result.addAll(left.subList(i, left.size()));\n    result.addAll(right.subList(j, right.size()));\n    return result;\n}'
  },
  binarySearch: {
    JavaScript: 'function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n}',
    Python: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1',
    TypeScript: 'function binarySearch<T>(arr: T[], target: T): number {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n}',
    Java: 'public static <T extends Comparable<T>> int binarySearch(List<T> arr, T target) {\n    int left = 0;\n    int right = arr.size() - 1;\n    while (left <= right) {\n        int mid = (left + right) / 2;\n        int comparison = arr.get(mid).compareTo(target);\n        if (comparison == 0) return mid;\n        if (comparison < 0) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return -1;\n}'
  },
  depthFirstSearch: {
    JavaScript: 'function dfs(graph, start, visited = new Set()) {\n  visited.add(start);\n  console.log(start);\n  for (const neighbor of graph[start]) {\n    if (!visited.has(neighbor)) {\n      dfs(graph, neighbor, visited);\n    }\n  }\n}',
    Python: 'def dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    print(start)\n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)',
    TypeScript: 'function dfs(graph: Map<string, string[]>, start: string, visited: Set<string> = new Set()): void {\n  visited.add(start);\n  console.log(start);\n  for (const neighbor of graph.get(start) || []) {\n    if (!visited.has(neighbor)) {\n      dfs(graph, neighbor, visited);\n    }\n  }\n}',
    Java: 'public static void dfs(Map<String, List<String>> graph, String start, Set<String> visited) {\n    visited.add(start);\n    System.out.println(start);\n    for (String neighbor : graph.get(start)) {\n        if (!visited.contains(neighbor)) {\n            dfs(graph, neighbor, visited);\n        }\n    }\n}'
  },
  breadthFirstSearch: {
    JavaScript: 'function bfs(graph, start) {\n  const visited = new Set([start]);\n  const queue = [start];\n  while (queue.length > 0) {\n    const vertex = queue.shift();\n    console.log(vertex);\n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n}',
    Python: 'def bfs(graph, start):\n    visited = {start}\n    queue = [start]\n    while queue:\n        vertex = queue.pop(0)\n        print(vertex)\n        for neighbor in graph[vertex]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)',
    TypeScript: 'function bfs(graph: Map<string, string[]>, start: string): void {\n  const visited = new Set([start]);\n  const queue = [start];\n  while (queue.length > 0) {\n    const vertex = queue.shift()!;\n    console.log(vertex);\n    for (const neighbor of graph.get(vertex) || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n}',
    Java: 'public static void bfs(Map<String, List<String>> graph, String start) {\n    Set<String> visited = new HashSet<>(Arrays.asList(start));\n    Queue<String> queue = new LinkedList<>(Arrays.asList(start));\n    while (!queue.isEmpty()) {\n        String vertex = queue.poll();\n        System.out.println(vertex);\n        for (String neighbor : graph.get(vertex)) {\n            if (!visited.contains(neighbor)) {\n                visited.add(neighbor);\n                queue.offer(neighbor);\n            }\n        }\n    }\n}'
  }
};

// Web development patterns
const webPatterns = {
  promiseChain: {
    JavaScript: 'function fetchData() {\n  return fetch("https://api.example.com/data")\n    .then(response => response.json())\n    .then(data => processData(data))\n    .catch(error => console.error(error));\n}',
    TypeScript: 'async function fetchData(): Promise<Data> {\n  try {\n    const response = await fetch("https://api.example.com/data");\n    const data = await response.json();\n    return processData(data);\n  } catch (error) {\n    console.error(error);\n    throw error;\n  }\n}'
  },
  eventHandling: {
    JavaScript: 'document.addEventListener("click", function(event) {\n  if (event.target.matches(".button")) {\n    event.preventDefault();\n    handleClick(event);\n  }\n});',
    TypeScript: 'document.addEventListener("click", (event: MouseEvent) => {\n  if ((event.target as Element).matches(".button")) {\n    event.preventDefault();\n    handleClick(event);\n  }\n});'
  }
};

// Design patterns
const designPatterns = {
  singleton: {
    JavaScript: 'class Singleton {\n  static instance;\n  constructor() {\n    if (Singleton.instance) {\n      return Singleton.instance;\n    }\n    Singleton.instance = this;\n  }\n}',
    TypeScript: 'class Singleton {\n  private static instance: Singleton;\n  private constructor() {}\n  public static getInstance(): Singleton {\n    if (!Singleton.instance) {\n      Singleton.instance = new Singleton();\n    }\n    return Singleton.instance;\n  }\n}',
    Python: 'class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance',
    Java: 'public class Singleton {\n    private static Singleton instance;\n    private Singleton() {}\n    public static synchronized Singleton getInstance() {\n        if (instance == null) {\n            instance = new Singleton();\n        }\n        return instance;\n    }\n}',
    'C++': 'class Singleton {\n    static Singleton* instance;\n    Singleton() {}\npublic:\n    static Singleton* getInstance() {\n        if (instance == nullptr) {\n            instance = new Singleton();\n        }\n        return instance;\n    }\n};'
  },
  observer: {
    JavaScript: 'class Observer {\n  update(data) {}\n}\n\nclass Subject {\n  observers = [];\n  addObserver(observer) {\n    this.observers.push(observer);\n  }\n  notify(data) {\n    this.observers.forEach(observer => observer.update(data));\n  }\n}',
    TypeScript: 'interface Observer {\n  update(data: any): void;\n}\n\nclass Subject {\n  private observers: Observer[] = [];\n  addObserver(observer: Observer): void {\n    this.observers.push(observer);\n  }\n  notify(data: any): void {\n    this.observers.forEach(observer => observer.update(data));\n  }\n}',
    Python: 'class Observer:\n    def update(self, data):\n        pass\n\nclass Subject:\n    def __init__(self):\n        self.observers = []\n    def add_observer(self, observer):\n        self.observers.append(observer)\n    def notify(self, data):\n        for observer in self.observers:\n            observer.update(data)',
    Java: 'interface Observer {\n    void update(Object data);\n}\n\nclass Subject {\n    private List<Observer> observers = new ArrayList<>();\n    public void addObserver(Observer observer) {\n        observers.add(observer);\n    }\n    public void notify(Object data) {\n        observers.forEach(observer -> observer.update(data));\n    }\n}'
  },
  factory: {
    JavaScript: 'class ProductFactory {\n  createProduct(type) {\n    switch (type) {\n      case "A":\n        return new ProductA();\n      case "B":\n        return new ProductB();\n      default:\n        throw new Error("Invalid product type");\n    }\n  }\n}',
    TypeScript: 'interface Product {}\n\nclass ProductFactory {\n  createProduct(type: string): Product {\n    switch (type) {\n      case "A":\n        return new ProductA();\n      case "B":\n        return new ProductB();\n      default:\n        throw new Error("Invalid product type");\n    }\n  }\n}',
    Python: 'class ProductFactory:\n    def create_product(self, type):\n        if type == "A":\n            return ProductA()\n        elif type == "B":\n            return ProductB()\n        else:\n            raise ValueError("Invalid product type")',
    Java: 'public class ProductFactory {\n    public Product createProduct(String type) {\n        switch (type) {\n            case "A":\n                return new ProductA();\n            case "B":\n                return new ProductB();\n            default:\n                throw new IllegalArgumentException("Invalid product type");\n        }\n    }\n}'
  },
  strategy: {
    JavaScript: 'class Context {\n  constructor(strategy) {\n    this.strategy = strategy;\n  }\n  executeStrategy(data) {\n    return this.strategy.execute(data);\n  }\n}',
    TypeScript: 'interface Strategy {\n  execute(data: any): any;\n}\n\nclass Context {\n  constructor(private strategy: Strategy) {}\n  executeStrategy(data: any): any {\n    return this.strategy.execute(data);\n  }\n}',
    Python: 'class Context:\n    def __init__(self, strategy):\n        self.strategy = strategy\n    def execute_strategy(self, data):\n        return self.strategy.execute(data)',
    Java: 'public class Context {\n    private Strategy strategy;\n    public Context(Strategy strategy) {\n        this.strategy = strategy;\n    }\n    public Object executeStrategy(Object data) {\n        return strategy.execute(data);\n    }\n}'
  },
  decorator: {
    JavaScript: 'class Component {\n  operation() {}\n}\n\nclass Decorator extends Component {\n  constructor(component) {\n    super();\n    this.component = component;\n  }\n  operation() {\n    return this.component.operation();\n  }\n}',
    TypeScript: 'interface Component {\n  operation(): string;\n}\n\nclass Decorator implements Component {\n  constructor(private component: Component) {}\n  operation(): string {\n    return this.component.operation();\n  }\n}',
    Python: 'class Component:\n    def operation(self):\n        pass\n\nclass Decorator(Component):\n    def __init__(self, component):\n        self.component = component\n    def operation(self):\n        return self.component.operation()',
    Java: 'public interface Component {\n    String operation();\n}\n\npublic class Decorator implements Component {\n    private Component component;\n    public Decorator(Component component) {\n        this.component = component;\n    }\n    public String operation() {\n        return component.operation();\n    }\n}'
  }
};

// Data structures
const dataStructures = {
  linkedList: {
    JavaScript: 'class Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n  }\n  append(data) {\n    if (!this.head) {\n      this.head = new Node(data);\n      return;\n    }\n    let current = this.head;\n    while (current.next) {\n      current = current.next;\n    }\n    current.next = new Node(data);\n  }\n}',
    Python: 'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def append(self, data):\n        if not self.head:\n            self.head = Node(data)\n            return\n        current = self.head\n        while current.next:\n            current = current.next\n        current.next = Node(data)',
    TypeScript: 'class Node<T> {\n  data: T;\n  next: Node<T> | null;\n  constructor(data: T) {\n    this.data = data;\n    this.next = null;\n  }\n}\n\nclass LinkedList<T> {\n  head: Node<T> | null;\n  constructor() {\n    this.head = null;\n  }\n  append(data: T): void {\n    if (!this.head) {\n      this.head = new Node(data);\n      return;\n    }\n    let current = this.head;\n    while (current.next) {\n      current = current.next;\n    }\n    current.next = new Node(data);\n  }\n}'
  },
  binaryTree: {
    JavaScript: 'class TreeNode {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinaryTree {\n  constructor() {\n    this.root = null;\n  }\n  insert(value) {\n    const node = new TreeNode(value);\n    if (!this.root) {\n      this.root = node;\n      return;\n    }\n    let current = this.root;\n    while (true) {\n      if (value < current.value) {\n        if (!current.left) {\n          current.left = node;\n          break;\n        }\n        current = current.left;\n      } else {\n        if (!current.right) {\n          current.right = node;\n          break;\n        }\n        current = current.right;\n      }\n    }\n  }\n}',
    Python: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BinaryTree:\n    def __init__(self):\n        self.root = None\n    def insert(self, value):\n        node = TreeNode(value)\n        if not self.root:\n            self.root = node\n            return\n        current = self.root\n        while True:\n            if value < current.value:\n                if not current.left:\n                    current.left = node\n                    break\n                current = current.left\n            else:\n                if not current.right:\n                    current.right = node\n                    break\n                current = current.right'
  },
  stack: {
    JavaScript: 'class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(item) {\n    this.items.push(item);\n  }\n  pop() {\n    return this.items.pop();\n  }\n  peek() {\n    return this.items[this.items.length - 1];\n  }\n  isEmpty() {\n    return this.items.length === 0;\n  }\n}',
    TypeScript: 'class Stack<T> {\n  private items: T[] = [];\n  push(item: T): void {\n    this.items.push(item);\n  }\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n}',
    Python: 'class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        return self.items.pop()\n    def peek(self):\n        return self.items[-1]\n    def is_empty(self):\n        return len(self.items) == 0',
    Java: 'public class Stack<T> {\n    private List<T> items = new ArrayList<>();\n    public void push(T item) {\n        items.add(item);\n    }\n    public T pop() {\n        return items.remove(items.size() - 1);\n    }\n    public T peek() {\n        return items.get(items.size() - 1);\n    }\n    public boolean isEmpty() {\n        return items.isEmpty();\n    }\n}'
  },
  queue: {
    JavaScript: 'class Queue {\n  constructor() {\n    this.items = [];\n  }\n  enqueue(item) {\n    this.items.push(item);\n  }\n  dequeue() {\n    return this.items.shift();\n  }\n  peek() {\n    return this.items[0];\n  }\n  isEmpty() {\n    return this.items.length === 0;\n  }\n}',
    TypeScript: 'class Queue<T> {\n  private items: T[] = [];\n  enqueue(item: T): void {\n    this.items.push(item);\n  }\n  dequeue(): T | undefined {\n    return this.items.shift();\n  }\n  peek(): T | undefined {\n    return this.items[0];\n  }\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n}',
    Python: 'class Queue:\n    def __init__(self):\n        self.items = []\n    def enqueue(self, item):\n        self.items.append(item)\n    def dequeue(self):\n        return self.items.pop(0)\n    def peek(self):\n        return self.items[0]\n    def is_empty(self):\n        return len(self.items) == 0',
    Java: 'public class Queue<T> {\n    private List<T> items = new ArrayList<>();\n    public void enqueue(T item) {\n        items.add(item);\n    }\n    public T dequeue() {\n        return items.remove(0);\n    }\n    public T peek() {\n        return items.get(0);\n    }\n    public boolean isEmpty() {\n        return items.isEmpty();\n    }\n}'
  },
  hashTable: {
    JavaScript: 'class HashTable {\n  constructor() {\n    this.table = {};\n  }\n  put(key, value) {\n    this.table[key] = value;\n  }\n  get(key) {\n    return this.table[key];\n  }\n  remove(key) {\n    delete this.table[key];\n  }\n}',
    TypeScript: 'class HashTable<T> {\n  private table: { [key: string]: T } = {};\n  put(key: string, value: T): void {\n    this.table[key] = value;\n  }\n  get(key: string): T | undefined {\n    return this.table[key];\n  }\n  remove(key: string): void {\n    delete this.table[key];\n  }\n}',
    Python: 'class HashTable:\n    def __init__(self):\n        self.table = {}\n    def put(self, key, value):\n        self.table[key] = value\n    def get(self, key):\n        return self.table.get(key)\n    def remove(self, key):\n        del self.table[key]',
    Java: 'public class HashTable<K, V> {\n    private Map<K, V> table = new HashMap<>();\n    public void put(K key, V value) {\n        table.put(key, value);\n    }\n    public V get(K key) {\n        return table.get(key);\n    }\n    public void remove(K key) {\n        table.remove(key);\n    }\n}'
  }
};

// Generate all snippets
export const codeSnippets: CodeSnippet[] = [
  // Algorithm snippets
  ...generateLanguageVariants('Fibonacci', algorithmImplementations.fibonacci, 'algorithms', 
    ['fibonacci', 'recursion', 'algorithms', 'function', 'math', 'dynamic programming'], 'easy'),
  ...generateLanguageVariants('Quick Sort', algorithmImplementations.quickSort, 'algorithms',
    ['quicksort', 'sorting', 'algorithms', 'function', 'arrays', 'divide and conquer'], 'medium'),
  ...generateLanguageVariants('Merge Sort', algorithmImplementations.mergeSort, 'algorithms',
    ['mergesort', 'sorting', 'algorithms', 'function', 'arrays', 'divide and conquer'], 'medium'),
  ...generateLanguageVariants('Binary Search', algorithmImplementations.binarySearch, 'algorithms',
    ['binary search', 'searching', 'algorithms', 'function', 'arrays', 'divide and conquer'], 'easy'),
  ...generateLanguageVariants('Depth First Search', algorithmImplementations.depthFirstSearch, 'algorithms',
    ['dfs', 'graph', 'algorithms', 'function', 'traversal', 'recursion'], 'medium'),
  ...generateLanguageVariants('Breadth First Search', algorithmImplementations.breadthFirstSearch, 'algorithms',
    ['bfs', 'graph', 'algorithms', 'function', 'traversal', 'queue'], 'medium'),

  // Web development snippets
  ...generateLanguageVariants('Promise Chain', webPatterns.promiseChain, 'web',
    ['promises', 'async', 'fetch', 'api', 'web', 'http'], 'medium'),
  ...generateLanguageVariants('Event Handling', webPatterns.eventHandling, 'web',
    ['events', 'dom', 'browser', 'web', 'frontend', 'user interaction'], 'easy'),

  // Design pattern snippets
  ...generateLanguageVariants('Singleton Pattern', designPatterns.singleton, 'patterns',
    ['singleton', 'design patterns', 'oop', 'creational patterns'], 'medium'),
  ...generateLanguageVariants('Observer Pattern', designPatterns.observer, 'patterns',
    ['observer', 'design patterns', 'oop', 'behavioral patterns', 'events'], 'hard'),
  ...generateLanguageVariants('Factory Pattern', designPatterns.factory, 'patterns',
    ['factory', 'design patterns', 'oop', 'creational patterns', 'abstraction'], 'medium'),
  ...generateLanguageVariants('Strategy Pattern', designPatterns.strategy, 'patterns',
    ['strategy', 'design patterns', 'oop', 'behavioral patterns', 'algorithms'], 'medium'),
  ...generateLanguageVariants('Decorator Pattern', designPatterns.decorator, 'patterns',
    ['decorator', 'design patterns', 'oop', 'structural patterns', 'wrapper'], 'hard'),

  // Data structure snippets
  ...generateLanguageVariants('Linked List', dataStructures.linkedList, 'data-structures',
    ['linked list', 'data structures', 'oop', 'pointers', 'nodes'], 'medium'),
  ...generateLanguageVariants('Binary Tree', dataStructures.binaryTree, 'data-structures',
    ['binary tree', 'data structures', 'oop', 'trees', 'nodes', 'recursion'], 'hard'),
  ...generateLanguageVariants('Stack', dataStructures.stack, 'data-structures',
    ['stack', 'data structures', 'oop', 'lifo', 'arrays'], 'easy'),
  ...generateLanguageVariants('Queue', dataStructures.queue, 'data-structures',
    ['queue', 'data structures', 'oop', 'fifo', 'arrays'], 'easy'),
  ...generateLanguageVariants('Hash Table', dataStructures.hashTable, 'data-structures',
    ['hash table', 'data structures', 'oop', 'hashing', 'arrays', 'objects'], 'medium'),

  // Text snippets
  {
    id: 'text-random',
    language: 'Text',
    name: 'Random Story',
    difficulty: 'medium',
    code: catParagraphs[Math.floor(Math.random() * catParagraphs.length)],
    category: 'story',
    keywords: ['story', 'text', 'typing', 'practice', 'cats']
  }
]; 