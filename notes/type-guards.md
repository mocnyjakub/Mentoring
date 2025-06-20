# TypeScript Type Guards

## 📋 Czym są Type Guards?

Type Guards to mechanizm TypeScript pozwalający na bezpieczne sprawdzanie typów w runtime i zawężanie unii typów.

## 🎯 Podstawowe Type Guards

### 1. typeof

```typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript wie, że value jest stringiem
    return value.toUpperCase();
  }
  // TypeScript wie, że value jest liczbą
  return value * 2;
}
```

### 2. instanceof

```typescript
class Dog {
  bark() {
    return "Woof!";
  }
}

class Cat {
  meow() {
    return "Meow!";
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    return animal.bark(); // TypeScript wie, że to Dog
  }
  return animal.meow(); // TypeScript wie, że to Cat
}
```

### 3. Array.isArray()

```typescript
function processData(data: string | string[]) {
  if (Array.isArray(data)) {
    // TypeScript wie, że data jest tablicą
    return data.join(", ");
  }
  // TypeScript wie, że data jest stringiem
  return data.toUpperCase();
}
```

### 4. in operator

```typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    // TypeScript wie, że animal jest Bird
    return animal.fly();
  }
  // TypeScript wie, że animal jest Fish
  return animal.swim();
}
```

## 🔧 Custom Type Guards

### Podstawowa składnia

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown) {
  if (isString(value)) {
    // TypeScript wie, że value jest stringiem
    console.log(value.toUpperCase());
  }
}
```

### Złożone przykłady

```typescript
interface User {
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "email" in obj &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).email === "string"
  );
}

// Użycie
function processApiResponse(response: unknown) {
  if (isUser(response)) {
    // TypeScript wie, że response jest User
    console.log(`Hello ${response.name}!`);
  }
}
```

## 🎯 Type Predicates w Array.filter()

### Problem bez type predicate

```typescript
const mixedArray: (string | number | null)[] = ["hello", 42, null, "world"];
const nonNullValues = mixedArray.filter((item) => item !== null);
// Typ: (string | number | null)[] ❌ - nadal zawiera null
```

### Rozwiązanie z type predicate

```typescript
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

const mixedArray: (string | number | null)[] = ["hello", 42, null, "world"];
const nonNullValues = mixedArray.filter(isNotNull);
// Typ: (string | number)[] ✅ - null został usunięty z typu
```

## 🚨 Discriminated Unions

```typescript
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; message: string };

type AppState = LoadingState | SuccessState | ErrorState;

function handleState(state: AppState) {
  switch (state.status) {
    case "loading":
      // TypeScript wie, że state jest LoadingState
      return "Ładowanie...";
    case "success":
      // TypeScript wie, że state jest SuccessState
      return `Dane: ${state.data}`;
    case "error":
      // TypeScript wie, że state jest ErrorState
      return `Błąd: ${state.message}`;
  }
}
```

## 💡 Best Practices

1. **Używaj konkretnych sprawdzeń** zamiast ogólnych
2. **Nazywaj funkcje zaczynając od "is"** (isString, isUser)
3. **Sprawdzaj wszystkie wymagane właściwości** w custom type guards
4. **Unikaj type assertions** gdy możesz użyć type guards
5. **Testuj type guards** z różnymi przypadkami

## 🔗 Powiązane tematy

- **Union Types** - typy które łączy type guards
- **Type Predicates** - funkcje zwracające informację o typie
- **Narrowing** - proces zawężania typów przez TypeScript
