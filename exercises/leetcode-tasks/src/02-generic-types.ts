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

// Testy
console.log("Test 1: Stack");
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.size()); // 1

console.log("\nTest 2: Queue");
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
queue.enqueue("third");
console.log(queue.dequeue()); // "first"
console.log(queue.peek()); // "second"
console.log(queue.size()); // 2

console.log("\nTest 3: Tree");
const tree = new Tree<number>();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(1);
tree.insert(9);
console.log(tree.inOrder()); // [1, 3, 5, 7, 9]
console.log(tree.preOrder()); // [5, 3, 1, 7, 9]
console.log(tree.postOrder()); // [1, 3, 9, 7, 5]

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
