
# Elevator System

Prosta implementacja symulacji systemu do obsługi wind.

## Funkcje

- Scheduler dla systemu wind zlecającego przyjazd windy (FCFS i NearestElevatorFCFS).

FCFS: pierwsze zlecenie zewnętrzne dla pierwszej dostępnej windy z listy.

NearestElevatorFCFS: pierwsze zlecenie zewnętrzne dla pierwszej najbliższej windy z listy.

- Osobna kolejka dla każdej windy ze zleceniami wewnętrznymi.
- Plik konfiguracyjny, w którym można wybrać algorytm schedulera, maxymalne piętro (licząc od 0), liczbę wind.
- Jakoś w miarę działa. 👍


## Tech Stack

👨‍💻 Node, Typescript, Express, Jest


## GUI
![image](https://user-images.githubusercontent.com/12800230/151262535-902b2780-2244-4f6f-8f13-83c22e508ddd.png)

## API

#### Call Elevator ( żądanie przyjazdu windy na dane piętro)

```
  GET /call/:floorId
```

| Parametr | Typ     | Opis                |
| :-------- | :------- | :------------------------- |
| `floorId` | `number` | numer piętra |


#### Request Elevator ( żądanie docelowego piętra w konkretnej windzie)

```
  GET /request/:elevatorId/:floorId
```

| Parametr | Typ    | Opis                |
| :-------- | :------- | :------------------------- |
| `elevatorId` | `number` | numer windy |
| `floorId` | `number` | numer piętra |


## Jak uruchomić lokalnie?

Sklonuj projekt

```bash
  git clone https://github.com/Morritz/avsystem
```

Przejdź do katalogu

```bash
  cd avsystem
```

Zainstaluj zależności

```bash
  npm install
```

Uruchom symulację

```bash
  npm start
```

## Testy

Dostępne testy, można uruchomić przy pomocy poniższej komendy:

```bash
  npm run test
```

## Roadmap

- Dodanie więcej algorytmów do obsługi
- Łatanie potencjalnych dziur, błędów i nakładających się odpowiedzialności obiektów.


## Autorzy

- [@Morritz](https://www.github.com/Morritz)

