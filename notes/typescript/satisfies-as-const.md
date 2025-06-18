# TypeScript: satisfies vs as const

## 📋 Wprowadzenie

Zarówno `satisfies` jak i `as const` służą do pracy z literalnymi typami w TypeScript, ale mają różne zastosowania i zachowania.

## 🎯 Operator satisfies

### Podstawowe zastosowanie

```typescript
type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// palette.green ma typ "#00ff00" (literal)
// palette.red ma typ [255, 0, 0] (literal tuple)
```

### Zalety satisfies

1. **Type safety** - sprawdza zgodność z typem
2. **Zachowuje literalne typy** - nie zawęża do ogólniejszych typów
3. **Pozwala na modifikacje** - obiekty nie są readonly

```typescript
// ✅ TypeScript sprawdzi zgodność z typem
const config = {
  development: {
    apiUrl: "http://localhost:3000",
    timeout: 5000,
  },
  production: {
    apiUrl: "https://api.production.com",
    timeout: 3000,
  },
} satisfies Record<string, { apiUrl: string; timeout: number }>;

// ✅ Można modyfikować
config.development.timeout = 10000;

// ✅ apiUrl zachowuje literalny typ
const devUrl = config.development.apiUrl; // "http://localhost:3000"
```

## 🔒 Operator as const

### Podstawowe zastosowanie

```typescript
const colors = {
  primary: "blue",
  secondary: "red",
} as const;

// Wszystkie wartości są readonly i literalne
// colors.primary: "blue" (readonly)
// colors.secondary: "red" (readonly)
```

### Zachowanie as const

1. **Wszystko readonly** - nie można modyfikować wartości
2. **Literalne typy** - wszystkie wartości stają się literalne
3. **Tablice → Tuples** - tablice zamieniają się na tuples

```typescript
// Tablice
const numbers = [1, 2, 3] as const;
// Typ: readonly [1, 2, 3]

// Obiekty
const config = {
  api: {
    url: "http://localhost:3000",
    timeout: 5000,
  },
  features: ["auth", "logging"],
} as const;

// ❌ Nie można modyfikować
// config.api.url = "new-url"; // Error: Cannot assign to 'url'
// config.features.push("new"); // Error: Property 'push' does not exist
```

## ⚖️ Porównanie

### 1. Modyfikacja wartości

```typescript
// satisfies - można modyfikować
const config1 = {
  url: "http://localhost:3000",
  timeout: 5000,
} satisfies { url: string; timeout: number };

config1.timeout = 10000; // ✅ OK

// as const - readonly
const config2 = {
  url: "http://localhost:3000",
  timeout: 5000,
} as const;

// config2.timeout = 10000; // ❌ Error
```

### 2. Sprawdzanie typów

```typescript
type Config = { url: string; timeout: number };

// satisfies - sprawdza zgodność z typem
const config1 = {
  url: "http://localhost:3000",
  timeout: 5000,
  // extra: "value" // ❌ Error - dodatkowa właściwość
} satisfies Config;

// as const - nie sprawdza zgodności
const config2 = {
  url: "http://localhost:3000",
  timeout: 5000,
  extra: "value", // ✅ OK - dodatkowa właściwość dozwolona
} as const;
```

### 3. Tablice

```typescript
// satisfies - zachowuje typ tablicy
const numbers1 = [1, 2, 3] satisfies number[];
// Typ: number[]
numbers1.push(4); // ✅ OK

// as const - tworzy readonly tuple
const numbers2 = [1, 2, 3] as const;
// Typ: readonly [1, 2, 3]
// numbers2.push(4); // ❌ Error
```

## 🎯 Kiedy używać którego?

### Użyj satisfies gdy:

1. **Chcesz sprawdzić zgodność z typem**
2. **Potrzebujesz modyfikować wartości**
3. **Chcesz zachować literalne typy tylko dla niektórych pól**
4. **Pracujesz z konfiguracją aplikacji**

```typescript
// Przykład: Konfiguracja API endpoints
const endpoints = {
  users: { path: "/api/users", method: "GET" },
  posts: { path: "/api/posts", method: "GET" },
} satisfies Record<string, { path: string; method: string }>;

// Można dodawać nowe endpointy
endpoints.comments = { path: "/api/comments", method: "GET" };
```

### Użyj as const gdy:

1. **Chcesz aby wszystko było readonly**
2. **Definiujesz stałe wartości**
3. **Chcesz zamienić tablice na tuples**
4. **Tworzysz enum-like struktury**

```typescript
// Przykład: Stałe wartości
const THEME_COLORS = {
  PRIMARY: "#007bff",
  SECONDARY: "#6c757d",
  SUCCESS: "#28a745",
} as const;

// Przykład: Status kody
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
```

## 🔄 Kombinowanie obu

```typescript
// Możesz kombinować oba podejścia
type ApiConfig = {
  baseUrl: string;
  endpoints: Record<string, string>;
};

const config = {
  baseUrl: "https://api.example.com",
  endpoints: {
    users: "/users",
    posts: "/posts",
  } as const, // endpoints są readonly
} satisfies ApiConfig; // cały config sprawdzany pod kątem typu

// config.baseUrl można zmieniać
config.baseUrl = "https://api.dev.com"; // ✅ OK

// endpoints są readonly
// config.endpoints.users = "/new-users"; // ❌ Error
```

## 💡 Best Practices

1. **Używaj satisfies** dla konfiguracji i dynamicznych struktur
2. **Używaj as const** dla stałych i enum-like struktur
3. **Kombinuj oba** gdy potrzebujesz różnego poziomu immutability
4. **Preferuj satisfies** gdy chcesz type safety z elastycznością
5. **Preferuj as const** gdy chcesz pełną immutability

## 🔗 Powiązane tematy

- **Literal Types** - typy reprezentujące konkretne wartości
- **Readonly Modifier** - oznaczenie właściwości jako tylko do odczytu
- **Template Literal Types** - typy oparte na template strings
- **Mapped Types** - typy tworzone na podstawie innych typów
