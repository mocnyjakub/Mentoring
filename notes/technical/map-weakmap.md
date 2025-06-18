# 📚 Map i WeakMap w JavaScript/TypeScript

## Map

Mapa to struktura danych, która przechowuje pary klucz-wartość, gdzie:

- Klucze mogą być dowolnego typu (obiekty, stringi, liczby)
- Wartości również mogą być dowolnego typu
- Zachowuje kolejność wstawiania elementów
- Klucze są unikalne

### Główne metody

```typescript
const map = new Map();
map.set(key, value); // dodanie elementu
map.get(key); // pobranie wartości
map.has(key); // sprawdzenie czy klucz istnieje
map.delete(key); // usunięcie elementu
map.clear(); // wyczyszczenie mapy
map.size; // rozmiar mapy
```

### Praktyczne zastosowania

#### 1. Cachowanie wyników

```typescript
const cache = new Map();
function expensiveOperation(key) {
  if (cache.has(key)) return cache.get(key);
  const result = /* obliczenia */;
  cache.set(key, result);
  return result;
}
```

#### 2. Przechowywanie metadanych

```typescript
const userMetadata = new Map();
userMetadata.set(userId, { lastLogin: new Date() });
```

## WeakMap

WeakMap to specjalna wersja Mapy, która:

- Przyjmuje tylko obiekty jako klucze
- Referencje do kluczy są "słabe" - nie blokują garbage collection
- Nie można iterować po WeakMap
- Nie można sprawdzić jej rozmiaru

### Główne metody

```typescript
const weakMap = new WeakMap();
weakMap.set(obj, value); // dodanie elementu
weakMap.get(obj); // pobranie wartości
weakMap.has(obj); // sprawdzenie czy klucz istnieje
weakMap.delete(obj); // usunięcie elementu
```

### Praktyczne zastosowania

#### 1. Przechowywanie prywatnych danych

```typescript
const privateData = new WeakMap();
class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  getName() {
    return privateData.get(this).name;
  }
}
```

#### 2. Obsługa obiektów cyklicznych

```typescript
function deepClone(obj) {
  const seen = new WeakMap();
  function clone(value) {
    if (seen.has(value)) return seen.get(value);
    const copy = /* tworzenie kopii */;
    seen.set(value, copy);
    return copy;
  }
  return clone(obj);
}
```

## 🔄 Map vs Object

### Map

- Klucze dowolnego typu
- Zachowuje kolejność
- Łatwiejsza iteracja
- Lepsza wydajność przy częstych operacjach
- Wbudowane metody

### Object

- Klucze tylko stringi/symbole
- Nie gwarantuje kolejności
- Mniej wydajna
- Brak wbudowanych metod

## ⚠️ Ograniczenia

### Map

- Większe zużycie pamięci
- Nie można użyć JSON.stringify()
- Niektóre operacje wolniejsze niż na obiekcie

### WeakMap

- Nie można iterować
- Nie można sprawdzić rozmiaru
- Klucze muszą być obiektami
- Nie można użyć prymitywów jako kluczy

## 🎯 Kiedy używać?

### Map

1. Gdy potrzebujesz kluczy różnych typów
2. Gdy ważna jest kolejność elementów
3. Gdy często dodajesz/usuwasz elementy
4. Gdy potrzebujesz łatwej iteracji
5. Gdy implementujesz cachowanie
6. Gdy przechowujesz metadane

### WeakMap

1. Gdy potrzebujesz przechowywać dane związane z obiektami, które mogą być usunięte
2. Gdy chcesz uniknąć wycieków pamięci
3. Gdy implementujesz prywatne dane w klasach
4. Gdy pracujesz z obiektami cyklicznymi
