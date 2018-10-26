//фунция-обработчик клика
function clickHandler() {
   //Проверка успела ли сработать функция hideTwoLastColors
   // Нужна для того, чтобы если пользователь кликнул на клетку, до того как
   // скрылись две открытые им клетки до этого, они сразу же скрывались и
   // не происходили какие-либо нестыковки.
   if (isTimeOut) {
      clearTimeout(timerId);
      hideTwoLastColors();
   };

   clickCounter += 1;
   clickAmount.innerHTML = 'Количество открытий: ' + clickCounter;

   //Показывается цвет клетки, на которую нажал пользователь, а также
   //записывается в переменную
   currentColor = this.querySelector('div');
   currentColor.style.visibility = '';

   //Если открываем первый цвет, то он также записывается в переменную
   //с последним цветом, а клетка с ним перестает вызывать функцию-обработчик клика
   if (clickCounter % 2 == 1) {
      lastColor = currentColor;
      this.onclick = "";

   //Если открываем второй цвет то проверяем совпал ли он с первым
   } else {

      //Если не совпал с первым цветом, то с задержкой вызываем
      // функцию hideTwoLastColors, которая скроет эти две клетки.
      // Также делаем первую клеткю снова активной для клика
      if (lastColor.className != currentColor.className) {
         isTimeOut = true;
         timerId = setTimeout(hideTwoLastColors, 600);
         lastColor.parentElement.onclick = clickHandler;

      //Если совпал с первым цветом, то делаем клекти неактивными и
      // увеличиваем кол-во найденных пар на 1
      } else {
         lastColor.parentElement.onclick = "";
         this.onclick = "";
         amountOfFoundPairs += 1

         //Если открыли все пары цветов
         if (amountOfFoundPairs == 8) {
            winReport.style.visibility = "visible";
         };
      };
   };
};

// Эта функция обрабатывает форму на стартовой странице(выбор размера и тд).
// Функия берет значения, выбранные пользователем и в соответствие с ними
// создает игровое поле и начинает игру.
// Здесь вызываются функции showGameField и startGame
function formHandler() {
   let inputs = document.querySelectorAll("#startForm div input");
   for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
         fieldSize = (i + 2) * 2;
      };
   };


   for (var i = 0; i < fieldSize*fieldSize; i++) {
      gameField.insertAdjacentHTML("afterBegin", "<div><div></div></div>");
   };

   for (let i = 1; i <= fieldSize * fieldSize / 2; i++) {
      codes.push(i);
      codes.push(i);
   };

   showGameField();
   startGame();
};

// Вызов следующей функции убирает стартовую страницу(где выбор размера) и
// показывет игровое поле. Также здесь собираются в списки внешние
// и внутренние div и присваивается ширина для поля.
function showGameField() {
   outerBlock = document.querySelectorAll(".game-field > div");
   innerBlock = document.querySelectorAll(".game-field div div");//Собираем блоки в коллекцию
   gameField.style.width = fieldSize*100 + "px";

   startForm.style.display = "none";
   clickAmount.style.visibility = "";
   gameField.style.visibility = "";
   restartGameButton.style.visibility = "";
   homeButton.style.visibility = "";
}



// Функция начинающая или сбрасывающая игру. Она присваивает различные цвета клеткам
// и сразу же скрывает их. Также она сбрасывает значение clickCounter amountOfFoundPairs и
// скрывает сообщение о победе winReport.
function startGame() {
   winReport.style.visibility = "hidden";
   amountOfFoundPairs = 0;
   clickCounter = 0;
   clickAmount.innerHTML = 'Количество открытий: ' + clickCounter;

   mixCodes();

   //Присваиваиваем блокам цвета и скрываем их
   for(let i = 0; i < innerBlock.length; i++) {
      innerBlock[i].className = "";
      innerBlock[i].className = "color-" + codes[i];
      innerBlock[i].style.visibility = 'hidden';
      outerBlock[i].onclick = clickHandler;
   };
};

//Мешает массив codes
function mixCodes() {
   codes.sort(compareRandom);

   function compareRandom(a, b) {
      return Math.random() - 0.5;
   };
};

//Прячет последние два цвета
function hideTwoLastColors() {
   isTimeOut = false;
   currentColor.style.visibility = 'hidden';
   lastColor.style.visibility = 'hidden';
};

function backStartPage() {
   clickAmount.style.visibility = "hidden";
   gameField.style.visibility = "hidden";
   restartGameButton.style.visibility = "hidden";
   homeButton.style.visibility = "hidden";

   startForm.style.display = "";

   codes = [];

   for (var i = 0; i < outerBlock.length; i++) {
      outerBlock[i].remove();
   }
}

let lastColor = "";
let currentColor = "";
let clickCounter = 0;
let isTimeOut = false;
let timerId = 0;
let amountOfFoundPairs = 0;
let codes = []; //Коды для дальнейшего присвания блокам
let outerBlock;
let innerBlock;
let fieldSize;//Длина стороны поля

restartGameButton.onclick = startGame;
homeButton.onclick = backStartPage;

//Прячем поле, счетчик кликов и кнопку рестарта игры
clickAmount.style.visibility = "hidden";
gameField.style.visibility = "hidden";
restartGameButton.style.visibility = "hidden";
homeButton.style.visibility = "hidden";
