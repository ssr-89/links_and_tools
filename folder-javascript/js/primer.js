"use strict"
/*метка break/continue*/
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // Для всех i...

  for (let j = 2; j < i; j++) { // проверить, делится ли число..
    if (i % j == 0) continue nextPrime; // не подходит, берём следующее
  }

  console.log(i); // простое число
}

/*цикл for - числа фибоначи*/
var fibo = [1, 1];

for (var i = 1; i < 9; ++i) {
  fibo.push(fibo[i] + fibo[i - 1]);
}
console.log(fibo);

/*отсеивание карт с помощью continue */
let cards = ["2", "Король", "Туз", "5", "6", "Король", "Дама"]; // карты в руке
let hand = [];

for (let card of cards) {
  // выполняем только для нечётного индекса
  if (card !== "Король" && card !== "Туз") continue;
  hand.push(card);
  console.log("Карта " + card + " добавлена в руку");
}

console.log("Карты в руке", hand);


/*аргументы функции*/
// при этом второй аргумент имеет значение по умолчанию
function findCard(cards, wantedCard = "Туз") {
  console.log("Ищем в колоде карту " + wantedCard);

  let found = false;

  for (let card of cards) {
    console.log(`Из колоды вытянута карта ${card}`);
    if (card === wantedCard) {
      found = true;
      break;
    }
  }
  console.log(
    found
      ? `Мы нашли карту ${wantedCard}!`
      : `В колоде нет карты ${wantedCard} :(`
  );
}

let myCards = ["2", "Король", "Туз", "5", "6", "Король"];

// ищем туза в переданной колоде карт
findCard(myCards);
// ищем пятёрку в переданной колоде карт
findCard(myCards, "5");

/**return*/
function findCardIndex(cards, wantedCard = "Туз") {
  console.log("Ищем в колоде карту " + wantedCard);

  let foundIndex = -1;

  for (let index in cards) {
    let card = cards[index];
    console.log(`Из колоды вытянута карта ${card}`);
    if (card === wantedCard) {
      foundIndex = index;
      break;
    }
  }
  console.log(
    foundIndex > -1
      ? `Мы нашли карту ${wantedCard}!`
      : `В колоде нет карты ${wantedCard} :(`
  );
  return foundIndex;
}

let deck = ["2", "Король", "7", "Туз", "5", "6", "Дама"];

let aceIndex = findCardIndex(deck);
let jackIndex = findCardIndex(deck, "Валет");

console.log(aceIndex + " - показывает кол-во перебранных карт");
console.log(jackIndex);


/**return 2 */
function findCardIndex(cards, wantedCard = "Туз") {
  console.log("Ищем в колоде карту " + wantedCard);

  for (let index in cards) {
    let card = cards[index];
    console.log(`Из колоды вытянута карта ${card}`);
    if (card === wantedCard) {
      console.log(`Мы нашли карту ${wantedCard}!`);
      return index;
    }
  }
  console.log(`В колоде нет карты ${wantedCard} :(`);
  return -1;
}

let myDeck = ["2", "Король", "7", "Туз", "5", "6", "Дама"];
findCardIndex(myDeck);
findCardIndex(myDeck, "Валет");

/**return 3 */
function checkAge(age) {
  console.log(`Вам ${age} лет`);
  if (age >= 18) return;
  console.log("Школота!");
  console.log(`Потерпи ещё ${18 - age} лет до совершеннолетия`);
}

// все сообщения будут выведены
checkAge(2);

// функция перестанет выполняться после первого сообщения
checkAge(23);
checkAge(18);


/**return 4 and undefined*/
function doNothing() {
  console.log("Я ничего не делаю!");
}

console.log(doNothing()); // undefined
let x = doNothing();
console.log(x); // undefined

let y;
console.log(y);

