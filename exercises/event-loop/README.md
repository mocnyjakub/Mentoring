# Event Loop - Ćwiczenia w TypeScript

Ten moduł zawiera serię ćwiczeń pomagających zrozumieć działanie Event Loop w JavaScript/TypeScript.

## Instalacja

```bash
# Z głównego folderu exercises
npm install
```

## Struktura zadań

1. `01-basic-order.ts` - Podstawowa kolejność wykonywania zadań

   - Różnica między microtaskami i macrotaskami
   - Kolejność wykonywania Promise i setTimeout

2. `02-nested-tasks.ts` - Zagnieżdżone zadania w Event Loop

   - Zagnieżdżone Promise i setTimeout
   - Kolejność wykonywania zadań w zagnieżdżonych strukturach

3. `03-async-await.ts` - Async/Await i Event Loop

   - Jak async/await wpływa na kolejność wykonywania
   - Różnica między await a Promise.then()

4. `04-advanced-scenarios.ts` - Zaawansowane scenariusze
   - Node.js specific: process.nextTick i setImmediate
   - Nieskończone pętle w microtaskach
   - Zagnieżdżone microtaski

## Jak uruchomić zadania

Każde zadanie możesz uruchomić za pomocą komendy:

```bash
npx ts-node src/01-basic-order.ts
npx ts-node src/02-nested-tasks.ts
npx ts-node src/03-async-await.ts
npx ts-node src/04-advanced-scenarios.ts
```

## Cel ćwiczeń

1. Zrozumieć kolejność wykonywania zadań w Event Loop
2. Poznać różnicę między microtaskami i macrotaskami
3. Zrozumieć jak działa async/await w kontekście Event Loop
4. Nauczyć się przewidywać kolejność wykonywania kodu asynchronicznego
5. Poznać specyficzne mechanizmy Node.js (process.nextTick, setImmediate)

## Wskazówki

- Przed uruchomieniem kodu, spróbuj przewidzieć kolejność logów
- Zwróć uwagę na różnice między Promise, setTimeout i async/await
- Pamiętaj, że microtaski (Promise) mają priorytet nad macrotaskami (setTimeout)
- Async/await to "syntactic sugar" dla Promise
- W Node.js mamy dodatkowe mechanizmy jak process.nextTick i setImmediate
