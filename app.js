navigator.serviceWorker.register("./sw.js");

var bgColorClass = "bg-blue";
var userTurn = true;
var sequenceArray = [1, 8, 57, 64, 3, 4, 5, 6, 17, 24, 25, 32, 33, 40, 41, 48, 59, 60, 61, 62, 19, 20, 21, 22, 27, 30, 35, 38, 43, 44, 45,46, 11, 12, 13, 14, 18, 23, 26, 31, 34, 39, 42, 47, 2, 7, 9, 16, 49, 58, 56, 63, 10, 15, 50, 55];

window.addEventListener("click", evt => {
  var index = +evt.srcElement.id.split("circle")[1];
  var color = bgColorClass.split("bg-")[1];
  if (evt.srcElement.classList.contains("circle") && !evt.srcElement.classList.contains("colored") && isClickable(index, color)) {
    evt.srcElement.classList.add("colored");
    evt.srcElement.classList.add(bgColorClass);
    userTurn = false;
    reverseAlgorithm(index, color);
    bgColorClass = bgColorClass === "bg-red" ? "bg-blue" : "bg-red";

    displayResult();
    computerClick();
  }
});

function reverseAlgorithm(index, color) {
  var oppositeColor = color === "blue" ? "red" : "blue";
  var indexArray;
  var toBeColored;

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, -8, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, 8, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, -1, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, 1, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, -9, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, -7, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, 7, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(index, 9, color, indexArray);
  colorChanger(toBeColored, indexArray, color, oppositeColor);
}

function isClickable(index, color) {
  if (
    colorChangeCheck(index, -8, color) ||
    colorChangeCheck(index, 8, color) ||
    colorChangeCheck(index, -1, color) ||
    colorChangeCheck(index, 1, color) ||
    colorChangeCheck(index, -7, color) ||
    colorChangeCheck(index, -9, color) ||
    colorChangeCheck(index, 7, color) ||
    colorChangeCheck(index, 9, color)
  )
    return true;
  return false;
}

function colorChangeCheck(index, change, color, indexArray = []) {
  var toBeColored = false;
  var rightLimit;
  var leftLimit;

  if(change === 1 || change === -1){
    rightLimit = Math.ceil(index / 8) * 8;
    leftLimit = rightLimit - 7;
  }
  else if(change === -8 || change === 8){
    rightLimit = 64;
    leftLimit = 1;
  }
  else if(change === -7 || change === 7){
    rightLimit = Math.min(64, index + ((index % 8) - 1) * 7);
    leftLimit = Math.max(1, index - (8 - (index % 8)) * 7);
  }
  else if(change === -9 || change === 9){
    rightLimit = Math.min(64, index + (8 -(index % 8)) * 9);
    leftLimit = Math.max(1, index - ((index % 8) -1) * 9);
  }

  index = index + change;
  while (index >= leftLimit && index <= rightLimit) {
    if (document.getElementById("circle" + index).classList.contains("colored")) {
      circleColor = document.getElementById("circle" + index).classList[3].split("bg-")[1];

      if (circleColor === color) {
        toBeColored = true;
        break;
      }

      indexArray.push(index);
      index = index + change;
    } else break;
  }

  return toBeColored && (indexArray.length > 0);
}

function colorChanger(toBeColored, indexArray, color, oppositeColor) {
  if (toBeColored) {
    indexArray.forEach(i => {
      document.getElementById("circle" + i).classList.remove("bg-" + oppositeColor);
      document.getElementById("circle" + i).classList.add("bg-" + color);
    });
  }
}

function computerClick(){
  sequenceArray.every((i) => {
    if(!document.getElementById("circle" + i).classList.contains("colored") && isClickable(i, 'red')){
      document.getElementById("circle" + i).classList.add("colored");
      document.getElementById("circle" + i).classList.add(bgColorClass);
      userTurn = false;
      reverseAlgorithm(i, 'red');
      bgColorClass = bgColorClass === "bg-red" ? "bg-blue" : "bg-red";
      displayResult();
      return false;
    }
    return true;
  })
}

function displayResult(){
  var red = 0;
  var blue = 0;
  for (let index = 1; index <= 64; index++) {
    if(document.getElementById("circle" + index).classList.contains('bg-red')){
      red++;
    }
    else if(document.getElementById("circle" + index).classList.contains('bg-blue')){
      blue++;
    }
  }

  document.getElementById("resultBlue").textContent = "Blue: " + blue;
  document.getElementById("resultRed").textContent = "Red: " + red;
}

function reset(){
  location.reload();
}