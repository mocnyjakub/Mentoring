# 📚 Shallow Copy vs Deep Copy w JavaScript

## 🔍 Shallow Copy (Płytka kopia)

Shallow copy tworzy nowy obiekt, ale kopiuje tylko referencje do zagnieżdżonych obiektów.

### Przykłady Shallow Copy

1. **Spread Operator**:

```typescript
const original = {
  name: "John",
  address: { city: "New York" },
};

const copy = { ...original };
copy.address.city = "Boston"; // Zmieni również original.address.city
```

2. **Object.assign()**:

```typescript
const original = {
  name: "John",
  address: { city: "New York" },
};

const copy = Object.assign({}, original);
copy.address.city = "Boston"; // Zmieni również original.address.city
```

3. **Array.slice()**:

```typescript
const original = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const copy = original.slice();
copy[0].name = "Bob"; // Zmieni również original[0].name
```

## 🎯 Deep Copy (Głęboka kopia)

Deep copy tworzy nowy obiekt i rekurencyjnie kopiuje wszystkie zagnieżdżone obiekty.

### Metody tworzenia Deep Copy

1. **JSON.parse(JSON.stringify())**:

```typescript
const original = {
  name: "John",
  address: { city: "New York" },
};

const copy = JSON.parse(JSON.stringify(original));
copy.address.city = "Boston"; // Nie zmieni original.address.city
```

2. **Structured Clone**:

```typescript
const original = {
  name: "John",
  address: { city: "New York" },
};

const copy = structuredClone(original);
copy.address.city = "Boston"; // Nie zmieni original.address.city
```

### ⚠️ Ograniczenia

1. **JSON.parse(JSON.stringify())**:

   - Nie obsługuje funkcji
   - Nie obsługuje `undefined`
   - Nie obsługuje cyklicznych referencji
   - Nie obsługuje `Date`, `Map`, `Set`

2. **Structured Clone**:
   - Nie obsługuje funkcji
   - Nie obsługuje DOM nodes
   - Nie obsługuje niektórych wbudowanych typów

## 🔄 Obiekty Cykliczne

Obiekt cykliczny to obiekt, który zawiera referencję do samego siebie (bezpośrednio lub pośrednio).

### Przykłady

1. **Bezpośrednia referencja**:

```typescript
const obj = {
  name: "John",
};
obj.self = obj; // Obiekt referencjonuje sam siebie
```

2. **Pośrednia referencja**:

```typescript
const parent = {
  name: "Parent",
};
const child = {
  name: "Child",
  parent: parent,
};
parent.child = child; // Tworzy cykl: parent -> child -> parent
```

### Obsługa obiektów cyklicznych

1. **Użycie WeakMap**:

```typescript
function deepClone(obj) {
  const seen = new WeakMap();

  function clone(value) {
    if (seen.has(value)) {
      return seen.get(value);
    }

    const copy = /* tworzenie kopii */;
    seen.set(value, copy);
    return copy;
  }

  return clone(obj);
}
```

2. **Użycie structuredClone**:

```typescript
const obj = { name: "John" };
obj.self = obj;

const copy = structuredClone(obj); // Działa poprawnie z obiektami cyklicznymi
```

## 🏗️ Analogie

### Shallow Copy

- Jak kopiowanie dokumentu z załącznikami
- Kopiujesz tylko pierwszą stronę
- Załączniki pozostają te same
- Zmiana załącznika wpływa na oba dokumenty

### Deep Copy

- Jak kopiowanie całego dokumentu z załącznikami
- Każdy załącznik jest kopiowany osobno
- Zmiana załącznika w kopii nie wpływa na oryginał

### Obiekt Cykliczny

- Jak lustra naprzeciwko siebie
- Każde lustro odbija drugie
- Tworzy nieskończoną pętlę odbić

## 📚 Podsumowanie

### Kiedy używać Shallow Copy?

- Gdy potrzebujesz tylko kopii pierwszego poziomu
- Gdy zagnieżdżone obiekty są niezmienne
- Gdy wydajność jest kluczowa

### Kiedy używać Deep Copy?

- Gdy potrzebujesz niezależnej kopii wszystkich poziomów
- Gdy zagnieżdżone obiekty mogą być modyfikowane
- Gdy potrzebujesz izolacji danych

### Jak obsługiwać obiekty cykliczne?

- Użyj WeakMap do śledzenia odwiedzonych obiektów
- Użyj structuredClone dla prostych przypadków
- Zaimplementuj własną logikę klonowania dla złożonych przypadków
