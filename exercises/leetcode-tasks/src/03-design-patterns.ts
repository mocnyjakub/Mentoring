/**
 * Zadanie 3: Implementacja wzorców projektowych
 *
 * Zaimplementuj następujące wzorce projektowe:
 * 1. Observer - system powiadomień
 * 2. Factory - fabryka komponentów UI
 * 3. Decorator - dekorator logowania
 *
 * Każdy wzorzec powinien być zaimplementowany w TypeScript
 * i zawierać odpowiednie interfejsy i typy.
 *
 * Przykład użycia:
 * // Observer
 * const notificationSystem = new NotificationSystem();
 * const user = new User("John");
 * notificationSystem.subscribe(user);
 * notificationSystem.notify("New message!");
 *
 * Wymagania:
 * 1. Observer:
 *    - System powiadomień z różnymi typami
 *    - Możliwość subskrypcji/unsubskrypcji
 *    - Asynchroniczne powiadomienia
 *
 * 2. Factory:
 *    - Fabryka komponentów UI (Button, Input, Card)
 *    - Konfigurowalne style i właściwości
 *    - Walidacja parametrów
 *
 * 3. Decorator:
 *    - Dekorator logowania dla metod
 *    - Pomiar czasu wykonania
 *    - Obsługa błędów
 *
 * Wskazówki:
 * - Użyj interfejsów i typów
 * - Zastosuj dependency injection
 * - Pamiętaj o SOLID
 */

// TODO: Zaimplementuj wzorce projektowe

// Testy
console.log("Test 1: Observer Pattern");
const notificationSystem = new NotificationSystem();
const user1 = new User("John");
const user2 = new User("Alice");

notificationSystem.subscribe(user1);
notificationSystem.subscribe(user2);

notificationSystem.notify("System update available!");
// John received: System update available!
// Alice received: System update available!

notificationSystem.unsubscribe(user1);
notificationSystem.notify("New feature!");
// Alice received: New feature!

console.log("\nTest 2: Factory Pattern");
const uiFactory = new UIFactory();

const button = uiFactory.createComponent("button", {
  text: "Click me",
  variant: "primary",
  size: "large",
});

const input = uiFactory.createComponent("input", {
  placeholder: "Enter text",
  type: "text",
  required: true,
});

const card = uiFactory.createComponent("card", {
  title: "Card Title",
  content: "Card content",
  footer: "Card footer",
});

console.log(button.render());
console.log(input.render());
console.log(card.render());

console.log("\nTest 3: Decorator Pattern");
class UserService {
  @Log()
  async getUser(id: number) {
    // Symulacja opóźnienia
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id, name: "John Doe" };
  }

  @Log()
  async updateUser(id: number, data: any) {
    throw new Error("Update failed");
  }
}

const userService = new UserService();

// Test metody getUser
userService.getUser(1).then((user) => {
  console.log("User:", user);
});

// Test metody updateUser
userService.updateUser(1, { name: "Jane" }).catch((error) => {
  console.log("Error:", error.message);
});

export {};
