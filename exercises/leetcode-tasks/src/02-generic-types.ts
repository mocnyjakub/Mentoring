/**
 * Zadanie 2: Implementacja typów generycznych
 *
 * Zaimplementuj system typów generycznych dla kolekcji.
 * Stwórz:
 * - Stack<T>
 * - Queue<T>
 * - Tree<T>
 * Każda struktura powinna mieć odpowiednie metody i typy.
 *
 * Przykład użycia:
 * const stack = new Stack<number>();
 * stack.push(1);
 * const value = stack.pop(); // number
 *
 * Wymagania:
 * 1. Implementacja powinna być typowana w TypeScript
 * 2. Każda struktura powinna obsługiwać:
 *    - Dodawanie elementów
 *    - Usuwanie elementów
 *    - Sprawdzanie rozmiaru
 *    - Sprawdzanie czy jest pusta
 * 3. Struktury powinny być immutable
 * 4. Struktury powinny obsługiwać iterację
 * 5. Struktury powinny obsługiwać mapowanie i filtrowanie
 *
 * Wskazówki:
 * - Użyj typów generycznych z ograniczeniami
 * - Wykorzystaj interfejsy
 * - Pamiętaj o type safety
 */

// TODO: Zaimplementuj struktury danych

class Stack<T> {
  public elements: Array<T> = [];

  public push(value: T) {
    this.elements.push(value);
  }

  public pop() {
    if (this.size() > 0) return this.elements.pop();
  }

  public peek() {
    if (this.elements.length === 0) return undefined;
    return this.elements[this.elements.length - 1];
  }

  public size() {
    return this.elements.length;
  }

  // Implementacja protokołu iteratora
  [Symbol.iterator](): Iterator<T> {
    let index = 0;

    return {
      next: (): IteratorResult<T> => {
        if (index < this.elements.length) {
          return {
            value: this.elements[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  }
}

class Queue<T> {
  public elements: Array<T> = [];

  public enqueue(value: T) {
    this.elements.push(value);
  }

  public dequeue() {
    if (this.size() > 0) return this.elements.splice(0, 1)[0];
  }

  public peek() {
    if (this.elements.length === 0) return undefined;
    return this.elements[0];
  }

  public size() {
    return this.elements.length;
  }

  public map<U>(callback: (x: T) => U) {
    const mapped = new Queue<U>();

    for (const element of this.elements) {
      const result = callback(element);
      mapped.enqueue(result);
    }

    return mapped;
  }

  public filter(callback: (x: T) => boolean) {
    const filtered = new Queue<T>();

    for (const element of this.elements) {
      const isValid = callback(element);

      if (isValid) filtered.enqueue(element);
    }

    return filtered;
  }

  public toArray() {
    return this.elements;
  }

  // Implementacja protokołu iteratora
  [Symbol.iterator](): Iterator<T> {
    let index = 0;

    return {
      next: (): IteratorResult<T> => {
        if (index < this.elements.length) {
          return {
            value: this.elements[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  }
}

// Testy
console.log("Test 1: Stack");
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.size()); // 2

console.log("\nTest 2: Queue");
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
queue.enqueue("third");
console.log(queue.dequeue()); // "first"
console.log(queue.peek()); // "second"
console.log(queue.size()); // 2

// console.log("\nTest 3: Tree");
// const tree = new Tree<number>();
// tree.insert(5);
// tree.insert(3);
// tree.insert(7);
// tree.insert(1);
// tree.insert(9);
// console.log(tree.inOrder()); // [1, 3, 5, 7, 9]
// console.log(tree.preOrder()); // [5, 3, 1, 7, 9]
// console.log(tree.postOrder()); // [1, 3, 9, 7, 5]

console.log("\nTest 4: Iteracja");
const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
numbers.push(3);
for (const num of numbers) {
  console.log(num);
}

console.log("\nTest 5: Mapowanie i filtrowanie");
const queue2 = new Queue<number>();
queue2.enqueue(1);
queue2.enqueue(2);
queue2.enqueue(3);
queue2.enqueue(4);
queue2.enqueue(5);

const doubled = queue2.map((x) => x * 2);
console.log(doubled.toArray()); // [2, 4, 6, 8, 10]

const evenNumbers = queue2.filter((x) => x % 2 === 0);
console.log(evenNumbers.toArray()); // [2, 4]

export {};
