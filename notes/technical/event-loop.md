
# 🧠 Event Loop w JavaScript – Kompletna Notatka

## 📌 Co to jest Event Loop?
Event Loop to mechanizm w JavaScript, który odpowiada za obsługę asynchronicznego kodu. Składa się z:
- **Call Stack** (stos wywołań)
- **Microtask Queue** (kolejka mikro-zadań, np. `Promise.then`, `queueMicrotask`)
- **Macrotask Queue** (kolejka makro-zadań, np. `setTimeout`, `setInterval`)
- **Frame Task Queue** (np. `requestAnimationFrame` — przed repaintem)

---

## 🧪 Przykład:

```tsx
function EventLoopAsync() {
  const handleClick = async () => {
    console.log("1. Klik");

    await Promise.resolve();

    console.log("2. Po await");

    requestAnimationFrame(() => {
      console.log("3. requestAnimationFrame");
    });

    queueMicrotask(() => {
      console.log("4. queueMicrotask");
    });

    setTimeout(() => {
      console.log("5. setTimeout");
    }, 0);

    console.log("6. Koniec funkcji");
  };

  return <button onClick={handleClick}>Kliknij</button>;
}
```

---

## 🧭 Kolejność Wykonania

| Kolejność | Co się dzieje?                     | Kolejka                 |
|-----------|------------------------------------|--------------------------|
| 1         | `console.log("1. Klik")`           | Call Stack               |
| 2         | `await Promise.resolve()`          | pauza funkcji            |
| 3         | `console.log("2. Po await")`       | Microtask                |
| 4         | `console.log("6. Koniec funkcji")` | Microtask                |
| 5         | `queueMicrotask(...)`              | Microtask (po microtasku)|
| 6         | `requestAnimationFrame(...)`       | Frame task               |
| 7         | `setTimeout(...)`                  | Macrotask                |

---

## 🔬 Dlaczego `queueMicrotask` pozwala "przeskoczyć" do końca eventu?

Jeśli w trakcie event handlera dodamy `queueMicrotask`, to jego kod nie wykona się od razu, tylko po zakończeniu aktualnego stosu wywołań (czyli poza bieżącym event handlerem).  
Pozwala to:
- uniknąć kolizji z bieżącą logiką,
- wykonać coś po logice kliknięcia, ale jeszcze **przed renderem (`rAF`)** i **przed makro-zadaniami (`setTimeout`)**.

---

## 🎯 Porównanie z `requestAnimationFrame`:

| Mechanizm               | Kolejka           | Kiedy się wykona?                               |
|------------------------|-------------------|--------------------------------------------------|
| `setTimeout(fn, 0)`    | Macrotask         | Po microtaskach, w nowej iteracji event loopa    |
| `Promise.then()`       | Microtask         | Zaraz po zakończeniu kodu synchronicznego        |
| `queueMicrotask(fn)`   | Microtask (1st)   | Jeszcze wcześniej niż `Promise.then()`           |
| `requestAnimationFrame(fn)` | Frame Task  | Przed kolejnym **repaintem** (klatką animacji)   |

---

## 📘 Podsumowanie

- `Promise.then` / `await` → microtask
- `setTimeout`, `setInterval` → macrotask
- `queueMicrotask` → microtask, przed `Promise.then`
- `requestAnimationFrame` → osobna kolejka, przed repaintem

---

## ✅ TL;DR Kolejność

Dla kodu:
```ts
console.log("1");
await Promise.resolve();
console.log("2");
requestAnimationFrame(() => console.log("3"));
queueMicrotask(() => console.log("4"));
setTimeout(() => console.log("5"), 0);
console.log("6");
```

Otrzymasz:
```
1
6
2
4
3
5
```
