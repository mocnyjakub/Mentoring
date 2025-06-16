# Prototypy w JavaScript

## Podstawowe koncepty

### 1. Co to jest prototyp?

- Prototyp to obiekt, z którego inne obiekty dziedziczą właściwości i metody
- Każdy obiekt w JavaScript ma prototyp (z wyjątkiem `Object.create(null)`)
- Prototypy tworzą łańcuch dziedziczenia

### 2. Jak działa dziedziczenie prototypowe?

```javascript
// Przykład 1: Proste dziedziczenie
const animal = {
  makeSound() {
    console.log("Dźwięk!");
  },
};

const dog = Object.create(animal);
dog.makeSound(); // "Dźwięk!"
```

### 3. Właściwość `__proto__` vs `prototype`

- `__proto__` - właściwość obiektu wskazująca na jego prototyp
- `prototype` - właściwość funkcji konstruktora, która będzie prototypem dla nowych instancji

```javascript
// Przykład 2: Różnica między __proto__ a prototype
function Animal() {}
const cat = new Animal();

console.log(cat.__proto__ === Animal.prototype); // true
```

### 4. Tworzenie obiektów z prototypem

```javascript
// Przykład 3: Różne sposoby tworzenia obiektów
// 1. Object.create()
const proto = { x: 10 };
const obj1 = Object.create(proto);

// 2. Konstruktor
function Animal(name) {
  this.name = name;
}
const obj2 = new Animal("Rex");

// 3. Literał obiektu
const obj3 = { x: 10 };
```

### 5. Łańcuch prototypów

```javascript
// Przykład 4: Łańcuch prototypów
function Animal(name) {
  this.name = name;
}

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const rex = new Dog("Rex");
// rex -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
```

## Praktyczne zastosowania

### 1. Współdzielenie metod

```javascript
// Przykład 5: Współdzielenie metod przez prototyp
Animal.prototype.makeSound = function () {
  console.log(`${this.name} wydaje dźwięk`);
};
```

### 2. Nadpisywanie metod

```javascript
// Przykład 6: Nadpisywanie metod
Dog.prototype.makeSound = function () {
  console.log(`${this.name} szczeka!`);
};
```

### 3. Sprawdzanie prototypów

```javascript
// Przykład 7: Sprawdzanie prototypów
console.log(rex instanceof Dog); // true
console.log(rex instanceof Animal); // true
console.log(Dog.prototype.isPrototypeOf(rex)); // true
```

## Najczęstsze pułapki

1. **Zapominanie o `constructor`**

```javascript
// Źle
Dog.prototype = Object.create(Animal.prototype);

// Dobrze
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
```

2. **Modyfikacja prototypu po utworzeniu instancji**

```javascript
// Uwaga: zmiany w prototypie wpływają na wszystkie instancje
Animal.prototype.newMethod = function () {};
```

3. **Nadmierne zagnieżdżanie prototypów**

```javascript
// Unikaj zbyt głębokiego łańcucha prototypów
// Lepiej użyć kompozycji niż dziedziczenia
```

## Best Practices

1. **Używaj `Object.create()` do tworzenia nowych obiektów**
2. **Zawsze ustawiaj `constructor` po zmianie prototypu**
3. **Preferuj kompozycję nad dziedziczeniem**
4. **Używaj `Object.freeze()` dla prototypów, które nie powinny być modyfikowane**
5. **Unikaj modyfikacji wbudowanych prototypów (np. `Array.prototype`)**

## Przydatne metody

1. **`Object.create(proto)`** - tworzy nowy obiekt z określonym prototypem
2. **`Object.getPrototypeOf(obj)`** - zwraca prototyp obiektu
3. **`Object.setPrototypeOf(obj, proto)`** - ustawia prototyp obiektu
4. **`obj.hasOwnProperty(prop)`** - sprawdza, czy właściwość należy do obiektu
5. **`Object.prototype.isPrototypeOf(obj)`** - sprawdza, czy obiekt jest prototypem

## Ćwiczenia do wykonania

1. Stwórz prosty system zwierząt z użyciem prototypów
2. Zaimplementuj dziedziczenie wielopoziomowe
3. Dodaj metody statyczne i instancyjne
4. Przetestuj różne sposoby tworzenia obiektów
5. Sprawdź działanie łańcucha prototypów
