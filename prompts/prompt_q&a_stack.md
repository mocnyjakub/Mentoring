Cześć! Pracuję nad osobistym projektem rocznym – aplikacją webową typu "Habit Tracker" z elementami społecznościowymi (użytkownicy mogą tworzyć grupy i wspierać się w wyzwaniach). Przewiduję, że na start będzie to MVP z podstawowymi funkcjami: rejestracja/logowanie, dodawanie nawyków, oznaczanie ich realizacji, proste statystyki, tworzenie grup i minimalistyczny system komentarzy w grupach.

Moje cele główne to:

1. Nauczyć się nowoczesnego frameworka frontendowego (myślałem o SvelteKit lub Vue 3 + Nuxt 3).
2. Zrozumieć podstawy budowy API zorientowanego na GraphQL.
3. Wykorzystać bazę danych, która będzie elastyczna i poradzi sobie z relacjami (użytkownicy, nawyki, grupy, postępy, komentarze).
4. Zapewnić łatwy i w miarę tani deployment.

Rozważam następujący stack:

- Frontend: SvelteKit (ze względu na wydajność i prostotę)
- Backend/API: Hasura (GraphQL "out of the box", łączy się z PostgreSQL)
- Baza danych: PostgreSQL (ze względu na relacyjność i wsparcie Hasury)
- Deployment: Vercel dla frontendu, Heroku lub Railway dla Hasury/PostgreSQL.

Moje pytania:

1. Jakie widzisz potencjalne wady i zalety tego stacku w kontekście mojego projektu i celów?
2. Czy SvelteKit i Hasura to dobre połączenie dla kogoś, kto chce się nauczyć GraphQL i budować reaktywny frontend? Jakie mogą być wyzwania integracyjne?
3. Czy PostgreSQL to optymalny wybór bazy danych dla tego typu aplikacji? Czy są jakieś alternatywy NoSQL (np. MongoDB), które warto rozważyć, i jakie byłyby ich plusy/minusy w tym przypadku (szczególnie pod kątem Hasury i relacji grupowych)?
4. Jak oceniasz wybraną strategię deploymentu pod kątem kosztów i łatwości zarządzania dla projektu hobbystycznego? Czy są jakieś bardziej zintegrowane platformy (BaaS), które mógłbym rozważyć (np. Supabase, Appwrite), i jak wypadają one w porównaniu z moim proponowanym stackiem pod kątem nauki GraphQL i elastyczności?
5. Zależy mi na tym, aby projekt był skalowalny w przyszłości (np. dodanie bardziej zaawansowanych statystyk, systemu notyfikacji, potencjalnie integracji z zewnętrznymi API). Czy wybrany stack stwarza jakieś ograniczenia w tym zakresie?

Proszę o szczegółową analizę i konkretne sugestie. Chciałbym uniknąć typowych błędów początkujących i wybrać technologie, które pozwolą mi się rozwijać.
