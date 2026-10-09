export type Question = {
  prompt: string;
  code?: string;
  options?: string[];
  answer: string;
  explanation: string;
  spoken?: boolean;
  aliases?: string[];
};
export type Unit = {
  title: string;
  subtitle: string;
  icon: string;
  lessons: string[];
  questions: Question[];
};
export const units: Unit[] = [
  {
    title: "Python Foundations",
    subtitle: "Every great adventure starts with a little hello.",
    icon: "sprout",
    lessons: ["Hello, Python!", "Variables & values", "Numbers & operators", "Strings & input"],
    questions: [
      {
        prompt: "Which line says hello to the world?",
        options: ['print("Hello, world!")', 'echo("Hello, world!")', 'say("Hello, world!")'],
        answer: 'print("Hello, world!")',
        explanation: "print() displays a value in the console.",
      },
      {
        prompt: "What does this code display?",
        code: 'name = "Pip"\nprint(name)',
        options: ["name", "Pip", '"name"'],
        answer: "Pip",
        explanation: "A variable stores a value. Here, name stores the string Pip.",
      },
      {
        prompt: "Say the name of the function that displays output.",
        answer: "print",
        spoken: true,
        aliases: ["print function", "the print function"],
        explanation: "The print() function displays text, numbers, and other values.",
      },
      {
        prompt: "Which name is a valid Python variable?",
        options: ["2snakes", "snake_count", "snake-count"],
        answer: "snake_count",
        explanation:
          "Variable names can contain letters, underscores, and digits, but cannot start with a digit.",
      },
      {
        prompt: "What value does score contain?",
        code: "score = 3 + 4 * 2",
        options: ["14", "11", "10"],
        answer: "11",
        explanation: "Multiplication happens before addition: 3 + 8 = 11.",
      },
      {
        prompt: "Which function reads text from the user?",
        options: ["input()", "read()", "ask()"],
        answer: "input()",
        explanation: "input() reads a line of text and returns a string.",
      },
    ],
  },
  {
    title: "Decisions & Logic",
    subtitle: "Choose your path with conditions and booleans.",
    icon: "signpost",
    lessons: ["True or false", "If & else", "Compare values", "Combine conditions"],
    questions: [
      {
        prompt: "What is the result of this comparison?",
        code: "5 > 3",
        options: ["True", "False", "None"],
        answer: "True",
        explanation: "Five is greater than three, so the expression evaluates to True.",
      },
      {
        prompt: "Which keyword starts a conditional branch?",
        options: ["if", "when", "check"],
        answer: "if",
        explanation: "if runs an indented block when a condition is true.",
      },
      {
        prompt: "Say the keyword for the branch used when an if condition is false.",
        answer: "else",
        spoken: true,
        aliases: ["the else keyword"],
        explanation: "else handles the case where earlier conditions are false.",
      },
      {
        prompt: "Which operator checks equality?",
        options: ["=", "==", "!="],
        answer: "==",
        explanation: "== compares values; = assigns a value; != means not equal.",
      },
      {
        prompt: "What does this expression evaluate to?",
        code: "True and False",
        options: ["True", "False", "None"],
        answer: "False",
        explanation: "and is true only when both operands are true.",
      },
      {
        prompt: "Which keyword combines conditions when either can be true?",
        options: ["or", "and", "not"],
        answer: "or",
        explanation: "or returns a truthy result if either condition is truthy.",
      },
    ],
  },
  {
    title: "Loops & Iteration",
    subtitle: "A little repetition goes a long way.",
    icon: "repeat",
    lessons: ["Your first for loop", "Ranges", "While loops", "Break & continue"],
    questions: [
      {
        prompt: "How many times does this loop run?",
        code: "for n in range(3):\n    print(n)",
        options: ["2", "3", "4"],
        answer: "3",
        explanation: "range(3) produces 0, 1, 2: three values.",
      },
      {
        prompt: "Which loop repeats while a condition is true?",
        options: ["while", "for each", "repeat"],
        answer: "while",
        explanation: "A while loop checks its condition before every iteration.",
      },
      {
        prompt: "Say the keyword that immediately exits a loop.",
        answer: "break",
        spoken: true,
        explanation: "break exits the nearest enclosing loop.",
      },
      {
        prompt: "What does range(1, 4) produce?",
        options: ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2, 3"],
        answer: "1, 2, 3",
        explanation: "The start is included; the stop is excluded.",
      },
      {
        prompt: "Which keyword skips to the next loop iteration?",
        options: ["continue", "skip", "pass"],
        answer: "continue",
        explanation: "continue skips the rest of the current iteration.",
      },
      {
        prompt: "What is total after this loop?",
        code: "total = 0\nfor n in [1, 2, 3]:\n    total += n",
        options: ["3", "6", "0"],
        answer: "6",
        explanation: "The loop adds 1, then 2, then 3 to total.",
      },
    ],
  },
  {
    title: "Collections",
    subtitle: "Collect ideas with lists, tuples, sets, and dictionaries.",
    icon: "layers",
    lessons: ["Lists & indexing", "Tuples & sets", "Dictionaries", "Comprehensions"],
    questions: [
      {
        prompt: "What does this expression return?",
        code: '["apple", "pear", "plum"][0]',
        options: ["apple", "pear", "plum"],
        answer: "apple",
        explanation: "Python sequences use zero-based indexing.",
      },
      {
        prompt: "Which list method adds a value to the end?",
        options: ["append()", "push()", "add()"],
        answer: "append()",
        explanation: "list.append(value) adds one item to the end.",
      },
      {
        prompt: "Say the collection type that stores key-value pairs.",
        answer: "dictionary",
        spoken: true,
        aliases: ["dict", "a dictionary", "dictionaries"],
        explanation: "A dictionary maps keys to values.",
      },
      {
        prompt: "Which collection removes duplicate values?",
        options: ["set", "list", "tuple"],
        answer: "set",
        explanation: "A set stores unique, hashable elements.",
      },
      {
        prompt: "What does this produce?",
        code: "[n * 2 for n in range(3)]",
        options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]"],
        answer: "[0, 2, 4]",
        explanation: "The comprehension doubles each value: 0, 1, and 2.",
      },
      {
        prompt: "Which expression looks up a dictionary value?",
        code: 'pet = {"name": "Pip"}',
        options: ['pet["name"]', "pet.name", "pet(0)"],
        answer: 'pet["name"]',
        explanation: "Use square brackets with a key to look up its value.",
      },
    ],
  },
  {
    title: "Functions",
    subtitle: "Build reusable blocks of Python magic.",
    icon: "code",
    lessons: ["Define a function", "Arguments", "Return values", "Scope & lambdas"],
    questions: [
      {
        prompt: "Which keyword defines a function?",
        options: ["def", "function", "fn"],
        answer: "def",
        explanation: "def introduces a function definition in Python.",
      },
      {
        prompt: "What does double(4) return?",
        code: "def double(n):\n    return n * 2",
        options: ["4", "8", "None"],
        answer: "8",
        explanation: "The argument n is 4; the function returns 4 * 2.",
      },
      {
        prompt: "Say the keyword that sends a value back from a function.",
        answer: "return",
        spoken: true,
        explanation: "return ends function execution and sends back a value.",
      },
      {
        prompt: "What is the default greeting?",
        code: 'def greet(name="friend"):\n    return "Hi, " + name\n\ngreet()',
        options: ["Hi, friend", "Hi, name", "Error"],
        answer: "Hi, friend",
        explanation: "The default argument is used when no value is supplied.",
      },
      {
        prompt: "Which keyword creates a small anonymous function?",
        options: ["lambda", "anon", "short"],
        answer: "lambda",
        explanation: "lambda creates an anonymous function with a single expression.",
      },
      {
        prompt: "A variable assigned inside a function is usually…",
        options: ["local to that function", "global everywhere", "always immutable"],
        answer: "local to that function",
        explanation: "Assignments inside a function normally create local variables.",
      },
    ],
  },
  {
    title: "Files & Exceptions",
    subtitle: "Work with real data and handle the unexpected.",
    icon: "file",
    lessons: ["Read a file", "Write & JSON", "Try & except", "Modules & packages"],
    questions: [
      {
        prompt: "Which mode opens a file for reading?",
        options: ['"r"', '"w"', '"a"'],
        answer: '"r"',
        explanation: "r reads; w overwrites; a appends.",
      },
      {
        prompt: "Why use with when opening a file?",
        options: [
          "It closes the file automatically",
          "It makes the file read-only",
          "It encrypts the file",
        ],
        answer: "It closes the file automatically",
        explanation: "The context manager closes the file when the block exits.",
      },
      {
        prompt: "Say the keyword that catches an exception after a try block.",
        answer: "except",
        spoken: true,
        aliases: ["except keyword"],
        explanation: "except handles exceptions raised by code in a try block.",
      },
      {
        prompt: "Which module handles JSON data?",
        options: ["json", "csv", "random"],
        answer: "json",
        explanation: "The standard json module encodes and decodes JSON.",
      },
      {
        prompt: "Which keyword loads a module?",
        options: ["import", "include", "require"],
        answer: "import",
        explanation: "import makes a module available in your code.",
      },
      {
        prompt: "Which block runs whether or not an exception occurs?",
        options: ["finally", "else", "always"],
        answer: "finally",
        explanation: "finally is used for cleanup and runs as the try statement exits.",
      },
    ],
  },
  {
    title: "Object-Oriented Python",
    subtitle: "Give your ideas their own identity.",
    icon: "box",
    lessons: ["Classes & objects", "Methods & self", "Inheritance", "Dataclasses"],
    questions: [
      {
        prompt: "Which keyword defines a class?",
        options: ["class", "object", "type"],
        answer: "class",
        explanation: "class defines a new type with attributes and methods.",
      },
      {
        prompt: "Which method initializes a new instance?",
        options: ["__init__", "__start__", "__newclass__"],
        answer: "__init__",
        explanation: "__init__ initializes an instance after it has been created.",
      },
      {
        prompt: "Say the conventional name for the first parameter of an instance method.",
        answer: "self",
        spoken: true,
        explanation: "self refers to the instance on which the method is called.",
      },
      {
        prompt: "Which definition inherits from Animal?",
        options: ["class Snake(Animal):", "class Snake extends Animal:", "class Snake -> Animal:"],
        answer: "class Snake(Animal):",
        explanation: "Parent classes are listed in parentheses after the new class name.",
      },
      {
        prompt: "What does an instance attribute belong to?",
        options: ["A particular object", "Only the module", "Every function"],
        answer: "A particular object",
        explanation: "Instance attributes hold state for an individual object.",
      },
      {
        prompt: "Which decorator generates methods for a data-focused class?",
        options: ["@dataclass", "@staticmethod", "@property"],
        answer: "@dataclass",
        explanation: "@dataclass can generate __init__, __repr__, and other methods.",
      },
    ],
  },
  {
    title: "Beyond the Basics",
    subtitle: "Level up with modern Python patterns.",
    icon: "sparkles",
    lessons: ["Generators", "Decorators", "Async & await", "Testing & typing"],
    questions: [
      {
        prompt: "Which keyword produces values from a generator?",
        options: ["yield", "return all", "emit"],
        answer: "yield",
        explanation: "yield pauses a generator and produces a value, preserving its state.",
      },
      {
        prompt: "What does a decorator usually do?",
        options: ["Wrap or modify a callable", "Only change text colors", "Delete a function"],
        answer: "Wrap or modify a callable",
        explanation: "Decorators transform functions or classes, often by wrapping them.",
      },
      {
        prompt: "Say the keyword used to wait for an awaitable inside an async function.",
        answer: "await",
        spoken: true,
        explanation: "await suspends a coroutine until the awaitable finishes.",
      },
      {
        prompt: "Which statement verifies a condition in a simple test?",
        options: ["assert", "verify", "ensure"],
        answer: "assert",
        explanation: "assert raises AssertionError if its condition is false.",
      },
      {
        prompt: "What does -> int mean in a function definition?",
        options: ["A return type annotation", "An integer conversion", "A loop instruction"],
        answer: "A return type annotation",
        explanation: "It annotates the intended return type; it does not enforce it at runtime.",
      },
      {
        prompt: "Which tool commonly manages Python packages?",
        options: ["pip", "npm", "cargo"],
        answer: "pip",
        explanation: "pip installs packages from indexes such as PyPI.",
      },
    ],
  },
];
export function lessonQuestions(unit: number, lesson: number): Question[] {
  const q = units[unit].questions;
  const written = q.filter((question) => !question.spoken);
  return [
    written[(lesson * 2) % written.length],
    written[(lesson * 2 + 1) % written.length],
    q.find((question) => question.spoken)!,
  ];
}
export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[().,!?:"']/g, "")
    .trim()
    .replace(/\s+/g, " ");
}
