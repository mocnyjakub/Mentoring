/**
 * Zadanie 3: Implementacja własnego systemu zadań (Task Queue)
 *
 * Twoim zadaniem jest zaimplementowanie prostego systemu zadań, który będzie symulował
 * działanie Event Loop w JavaScript. System powinien obsługiwać różne typy zadań
 * (microtasks i macrotasks) oraz wykonywać je w odpowiedniej kolejności.
 *
 * Przykład użycia:
 * ```ts
 * const taskQueue = new TaskQueue();
 *
 * // Dodawanie zadań
 * taskQueue.addMicrotask(() => console.log('Microtask 1'));
 * taskQueue.addMacrotask(() => console.log('Macrotask 1'));
 * taskQueue.addMicrotask(() => console.log('Microtask 2'));
 *
 * // Uruchomienie kolejki
 * taskQueue.run();
 * // Output:
 * // Microtask 1
 * // Microtask 2
 * // Macrotask 1
 * ```
 *
 * Wymagania:
 * 1. Implementacja powinna być typowana w TypeScript
 * 2. System powinien obsługiwać dwa typy zadań:
 *    - Microtasks (wykonywane natychmiast po aktualnym zadaniu)
 *    - Macrotasks (wykonywane po wszystkich microtasks)
 * 3. Zadania powinny być wykonywane w kolejności FIFO (First In, First Out)
 * 4. System powinien obsługiwać błędy w zadaniach
 * 5. System powinien umożliwiać anulowanie zadań
 *
 * Wskazówki:
 * - Użyj Promise do implementacji microtasks
 * - Użyj setTimeout do implementacji macrotasks
 * - Pamiętaj o obsłudze błędów
 * - Rozważ użycie Map do przechowywania zadań
 */

type Task = {
  type: "micro" | "macro";
  fn: () => void;
};

// TODO: Zaimplementuj klasę TaskQueue
class TaskQueue {
  private microTasks: Task[] = [];
  private macroTasks: Task[] = [];
  private isRunning = false;

  public addMicrotask(callback: () => void) {
    this.microTasks.push({
      type: "micro",
      fn: callback,
    });
    return callback;
  }

  public addMacrotask(callback: () => void) {
    this.macroTasks.push({
      type: "macro",
      fn: callback,
    });
    return callback;
  }

  public cancelTask(callback: () => void) {
    this.microTasks = this.microTasks.filter((task) => task.fn !== callback);
    this.macroTasks = this.macroTasks.filter((task) => task.fn !== callback);
  }

  private runMicroTasks() {
    while (this.microTasks.length > 0) {
      const task = this.microTasks.shift();
      if (task) {
        try {
          task.fn(); // Wykonujemy synchronicznie
        } catch (error) {
          console.error("Error in microtask:", error);
        }
      }
    }
  }

  private runMacroTasks() {
    if (this.macroTasks.length === 0) return;

    const task = this.macroTasks.shift();
    if (task) {
      try {
        task.fn();
      } catch (error) {
        console.error("Error in macrotask:", error);
      }
    }

    // Planujemy następny macrotask
    if (this.macroTasks.length > 0) {
      setTimeout(() => this.runMacroTasks(), 0);
    }
  }

  public run() {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      // Najpierw wykonujemy wszystkie microtaski
      this.runMicroTasks();

      // Następnie planujemy macrotaski
      if (this.macroTasks.length > 0) {
        setTimeout(() => this.runMacroTasks(), 0);
      }
    } finally {
      this.isRunning = false;
    }
  }
}

// Testy
const taskQueue = new TaskQueue();

// Test 1: Podstawowa kolejność zadań
console.log("Test 1: Podstawowa kolejność zadań");
taskQueue.addMicrotask(() => console.log("Microtask 1"));
taskQueue.addMacrotask(() => console.log("Macrotask 1"));
taskQueue.addMicrotask(() => console.log("Microtask 2"));
taskQueue.addMacrotask(() => console.log("Macrotask 2"));

// Test 2: Obsługa błędów
// console.log("\nTest 2: Obsługa błędów");
// taskQueue.addMicrotask(() => {
//   throw new Error("Błąd w microtask");
// });
// taskQueue.addMacrotask(() => {
//   throw new Error("Błąd w macrotask");
// });

// Test 3: Anulowanie zadań
// console.log("\nTest 3: Anulowanie zadań");
// const task1 = taskQueue.addMicrotask(() =>
//   console.log("To nie powinno się wykonać")
// );
// const task2 = taskQueue.addMacrotask(() =>
//   console.log("To nie powinno się wykonać")
// );
// taskQueue.cancelTask(task1);
// taskQueue.cancelTask(task2);

// Test 4: Zagnieżdżone zadania
// console.log("\nTest 4: Zagnieżdżone zadania");
// taskQueue.addMicrotask(() => {
//   console.log("Microtask 1");
//   taskQueue.addMicrotask(() => console.log("Zagnieżdżony Microtask"));
//   taskQueue.addMacrotask(() => console.log("Zagnieżdżony Macrotask"));
// });

// // Uruchomienie kolejki
taskQueue.run();

export {};
