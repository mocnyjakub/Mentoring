# Iterator Protocol w JavaScript/TypeScript

## Wprowadzenie

Iterator Protocol to jeden z fundamentalnych mechanizmów w JavaScript/TypeScript, który umożliwia sekwencyjne przechodzenie przez elementy kolekcji. Jest to podstawa działania pętli `for...of` oraz operatora spread (`...`).

## Kluczowe Koncepty

### 1. Symbol.iterator

- Jest to wbudowany Symbol w JavaScript
- Służy jako unikalny identyfikator dla metody iteratora
- JavaScript używa go do sprawdzenia, czy obiekt jest iterowalny

### 2. Protokół Iteratora

Iterator musi implementować metodę `next()`, która zwraca obiekt o strukturze:

```typescript
{
  value: T; // aktualny element
  done: boolean; // czy iteracja się zakończyła
}
```

## Implementacja

### Podstawowa Struktura

```typescript
class Collection<T> {
  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    const elements = this.elements;

    return {
      next(): IteratorResult<T> {
        if (index < elements.length) {
          return {
            value: elements[index++],
            done: false,
          };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
```

### Wyjaśnienie Składni [Symbol.iterator]()

1. **Symbol** - wbudowany obiekt tworzący unikalne identyfikatory
2. **Symbol.iterator** - predefiniowany Symbol dla iteracji
3. **[]** - computed property name (dynamiczna nazwa właściwości)
4. **()** - deklaracja metody

#### Krok po kroku:

```typescript
// To są równoważne zapisy:
class MyClass {
  [Symbol.iterator]() {
    /* ... */
  }
}

// Jest jak:
const specialKey = Symbol.iterator;
class MyClass {
  [specialKey]() {
    /* ... */
  }
}
```

## Analogia

Wyobraź sobie czytnik kart w talii:

- **Talia** to kolekcja (iterable)
- **Czytnik** to iterator
- **Przycisk "następna karta"** to metoda `next()`
- Każde naciśnięcie przycisku:
  - Pokazuje aktualną kartę (`value`)
  - Informuje czy to ostatnia karta (`done`)

## Praktyczne Zastosowania

### 1. Pętla for...of

```typescript
const collection = new Collection<number>([1, 2, 3]);
for (const item of collection) {
  console.log(item); // 1, 2, 3
}
```

### 2. Spread Operator

```typescript
const collection = new Collection<number>([1, 2, 3]);
const array = [...collection]; // [1, 2, 3]
```

### 3. Destrukturyzacja

```typescript
const collection = new Collection<number>([1, 2, 3]);
const [first, second] = collection; // first = 1, second = 2
```

### 4. Implementacja Stack z iteratorem

```typescript
class Stack<T> {
  private elements: T[] = [];

  push(value: T): void {
    this.elements.push(value);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  // Iterator implementation
  [Symbol.iterator](): Iterator<T> {
    let index = 0;

    return {
      next: (): IteratorResult<T> => {
        if (index < this.elements.length) {
          return {
            value: this.elements[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  }

  // Metody funkcyjne bazujące na iteratorze
  map<U>(callback: (value: T) => U): Stack<U> {
    const newStack = new Stack<U>();
    for (const element of this) {
      newStack.push(callback(element));
    }
    return newStack;
  }

  filter(predicate: (value: T) => boolean): Stack<T> {
    const newStack = new Stack<T>();
    for (const element of this) {
      if (predicate(element)) {
        newStack.push(element);
      }
    }
    return newStack;
  }
}
```

## Korzyści

1. **Standaryzacja** - jednolity interfejs dla wszystkich kolekcji
2. **Lazy Evaluation** - elementy są przetwarzane na żądanie
3. **Enkapsulacja** - szczegóły implementacji są ukryte
4. **Uniwersalność** - działa z wbudowanymi mechanizmami języka
5. **Memory Efficiency** - nie trzeba tworzyć całej tablicy na raz

## Best Practices

1. Implementuj iterator dla kolekcji własnych typów
2. Używaj TypeScript do zapewnienia type safety
3. Pamiętaj o immutability podczas iteracji
4. Rozważ implementację metod `map`, `filter` bazujących na iteratorze
5. Używaj `const` dla wartości, które się nie zmieniają w iteratorze

## Powiązane Koncepty

- **Generator Functions** - uproszczona składnia dla iteratorów
- **Async Iterators** - iteratory dla operacji asynchronicznych
- **Observable Pattern** - reaktywne strumienie danych
- **Functional Programming** - map, filter, reduce jako operacje na iteratorach

## Przykłady z rzeczywistych aplikacji

- Przeglądanie elementów DOM
- Iteracja po rezultatach z API (pagination)
- Przetwarzanie dużych zbiorów danych chunk po chunk
- Implementacja custom data structures (LinkedList, Tree, Graph)

## Często popełniane błędy

1. **Zapomnienie o done: true** - może prowadzić do nieskończonych pętli
2. **Modyfikacja kolekcji podczas iteracji** - może prowadzić do nieprzewidywalnych rezultatów
3. **Brak type safety** - używanie `any` zamiast generics
4. **Mutowanie stanu iteratora** - iterator powinien być stateless względem kolekcji
