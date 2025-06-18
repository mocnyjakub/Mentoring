# TypeScript: Union Types & Generics

## 📋 Union Types

### Podstawowe definicje

```typescript
// Prosty union type
type Status = "loading" | "success" | "error";

// Union różnych typów
type ID = string | number;

// Union z null/undefined
type User = { name: string; email: string } | null;
```

### Rekurencyjne Union Types

```typescript
type JSONValue =
  | null
  | undefined
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
```

### Discriminated Unions

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}
```

### Union Types w praktyce

```typescript
// API Response pattern
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string; code: number };

// Event handling
type UserEvent =
  | { type: "login"; userId: string }
  | { type: "logout" }
  | { type: "update_profile"; userId: string; changes: Partial<User> };
```

## 🎯 Generics

### Podstawowe generics

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Użycie
const result1 = identity<string>("hello"); // result1: string
const result2 = identity<number>(42); // result2: number
const result3 = identity("hello"); // TypeScript wnioskuje: string
```

### Generic constraints

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // ✅ OK - wiemy, że T ma właściwość length
  return arg;
}

// Użycie
loggingIdentity("hello"); // ✅ string ma length
loggingIdentity([1, 2, 3]); // ✅ array ma length
// loggingIdentity(42); // ❌ number nie ma length
```

### Keyof constraints

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30, email: "john@example.com" };

const name = getProperty(person, "name"); // string
const age = getProperty(person, "age"); // number
// const invalid = getProperty(person, "invalid"); // ❌ Error
```

### Generic interfaces

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // implementacja
    return null;
  }

  async findAll(): Promise<User[]> {
    // implementacja
    return [];
  }

  async save(user: User): Promise<User> {
    // implementacja
    return user;
  }

  async delete(id: string): Promise<void> {
    // implementacja
  }
}
```

### Generic utility types

```typescript
// Partial<T> - wszystkie właściwości opcjonalne
type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; }

// Pick<T, K> - wybierz tylko określone właściwości
type UserSummary = Pick<User, "id" | "name">;
// { id: string; name: string; }

// Omit<T, K> - usuń określone właściwości
type CreateUser = Omit<User, "id">;
// { name: string; email: string; }

// Record<K, T> - obiekt z kluczami K i wartościami T
type UserRoles = Record<string, "admin" | "user" | "guest">;
// { [key: string]: "admin" | "user" | "guest" }
```

## 🔄 Kombinowanie Union Types i Generics

### Generic functions z union types

```typescript
function processValue<T extends string | number>(value: T): T {
  if (typeof value === "string") {
    // TypeScript wie, że value jest string w tym bloku
    return value.toUpperCase() as T;
  }
  // TypeScript wie, że value jest number w tym bloku
  return (value * 2) as T;
}
```

### Conditional types

```typescript
type ApiResult<T> = T extends string
  ? { message: T }
  : T extends number
  ? { code: T }
  : { data: T };

type StringResult = ApiResult<string>; // { message: string }
type NumberResult = ApiResult<number>; // { code: number }
type ObjectResult = ApiResult<{ name: string }>; // { data: { name: string } }
```

### Mapped types z union

```typescript
type UserKeys = keyof User; // "id" | "name" | "email"

type UserGetters = {
  [K in UserKeys as `get${Capitalize<K>}`]: () => User[K];
};
// {
//   getId: () => string;
//   getName: () => string;
//   getEmail: () => string;
// }
```

## 🎯 Praktyczne wzorce

### Factory pattern z generics

```typescript
interface Serializable {
  serialize(): string;
}

class Factory<T extends Serializable> {
  private instances: T[] = [];

  create(constructor: new () => T): T {
    const instance = new constructor();
    this.instances.push(instance);
    return instance;
  }

  serializeAll(): string[] {
    return this.instances.map((instance) => instance.serialize());
  }
}
```

### Generic error handling

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function safeFetch<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Użycie
const result = await safeFetch<User[]>("/api/users");
if (result.success) {
  // TypeScript wie, że result.data jest User[]
  console.log(result.data.length);
} else {
  // TypeScript wie, że result.error jest Error
  console.error(result.error.message);
}
```

## 💡 Best Practices

### Union Types

1. **Używaj discriminated unions** dla complex typów
2. **Definiuj konkretne typy** zamiast `any`
3. **Używaj type guards** do zawężania typów
4. **Preferuj primitive unions** gdy to możliwe

### Generics

1. **Używaj znaczące nazwy** dla type parameters (nie tylko `T`)
2. **Dodawaj constraints** gdy potrzebne
3. **Unikaj over-engineering** - nie używaj generics gdy nie potrzeba
4. **Dokumentuj złożone generic types**

## 🔗 Powiązane tematy

- **Type Guards** - zawężanie union types
- **Conditional Types** - zaawansowane operacje na typach
- **Mapped Types** - transformacje typów
- **Template Literal Types** - typy oparte na stringach
