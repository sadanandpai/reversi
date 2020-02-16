navigator.serviceWorker.register("./sw.js");

var bgColorClass = "bg-blue";
var sequenceArray1 = [
  { i: 0, j: 0 },
  { i: 0, j: 7 },
  { i: 7, j: 0 },
  { i: 7, j: 7 }
];

var sequenceArray2 = [
  { i: 0, j: 2 },
  { i: 0, j: 3 },
  { i: 0, j: 4 },
  { i: 0, j: 5 },
  { i: 2, j: 0 },
  { i: 2, j: 7 },
  { i: 3, j: 0 },
  { i: 3, j: 7 },
  { i: 4, j: 0 },
  { i: 4, j: 7 },
  { i: 5, j: 0 },
  { i: 5, j: 7 },
  { i: 7, j: 2 },
  { i: 7, j: 3 },
  { i: 7, j: 4 },
  { i: 7, j: 5 }
];

var sequenceArray3 = [
  { i: 2, j: 2 },
  { i: 2, j: 3 },
  { i: 2, j: 4 },
  { i: 2, j: 5 },
  { i: 3, j: 2 },
  { i: 3, j: 5 },
  { i: 4, j: 2 },
  { i: 4, j: 5 },
  { i: 5, j: 2 },
  { i: 5, j: 3 },
  { i: 5, j: 4 },
  { i: 5, j: 5 },
  { i: 1, j: 2 },
  { i: 1, j: 3 },
  { i: 1, j: 4 },
  { i: 1, j: 5 },
  { i: 2, j: 1 },
  { i: 2, j: 6 },
  { i: 3, j: 1 },
  { i: 3, j: 6 },
  { i: 4, j: 1 },
  { i: 4, j: 6 },
  { i: 5, j: 1 },
  { i: 5, j: 6 },
  { i: 6, j: 2 },
  { i: 6, j: 3 },
  { i: 6, j: 4 },
  { i: 6, j: 5 }
];

var sequenceArray4 = [
  { i: 0, j: 1 },
  { i: 0, j: 6 },
  { i: 1, j: 0 },
  { i: 1, j: 7 },
  { i: 6, j: 0 },
  { i: 7, j: 1 },
  { i: 6, j: 7 },
  { i: 7, j: 6 },
  { i: 1, j: 1 },
  { i: 1, j: 6 },
  { i: 6, j: 1 },
  { i: 6, j: 6 }
];
var clearTimeout = null;

window.addEventListener("click", evt => {
  var i, j, index;

  if (evt.srcElement.classList.contains("circle")) {
    index = evt.srcElement.id.split("circle")[1];
    i = +index.charAt(0);
    j = +index.charAt(1);
  }

  var color = bgColorClass.split("bg-")[1];
  if (
    evt.srcElement.classList.contains("circle") &&
    !evt.srcElement.classList.contains("colored") &&
    isClickable(i, j, color) &&
    clearTimeout === null
  ) {
    evt.srcElement.classList.add("colored");
    evt.srcElement.classList.add(bgColorClass);
    reverseAlgorithm(i, j, color);
    bgColorClass = bgColorClass === "bg-red" ? "bg-blue" : "bg-red";

    displayResult();
    clearTimeout = setTimeout(() => {
      computerClick();
      clearTimeout = null;
    }, 1000);
  }
});

function reverseAlgorithm(i, j, color) {
  var oppositeColor = color === "blue" ? "red" : "blue";
  var indexArray;
  var toBeColored;

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, -1, 0, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, 1, 0, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, 0, -1, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, 0, 1, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, -1, -1, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, -1, 1, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, 1, -1, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);

  indexArray = [];
  toBeColored = false;
  toBeColored = colorChangeCheck(i, j, 1, 1, color, indexArray).toBeColored;
  colorChanger(toBeColored, indexArray, color, oppositeColor);
}

function isClickable(i, j, color) {
  if (
    colorChangeCheck(i, j, -1, 0, color).toBeColored ||
    colorChangeCheck(i, j, 1, 0, color).toBeColored ||
    colorChangeCheck(i, j, 0, -1, color).toBeColored ||
    colorChangeCheck(i, j, 0, 1, color).toBeColored ||
    colorChangeCheck(i, j, -1, -1, color).toBeColored ||
    colorChangeCheck(i, j, -1, 1, color).toBeColored ||
    colorChangeCheck(i, j, 1, -1, color).toBeColored ||
    colorChangeCheck(i, j, 1, 1, color).toBeColored
  )
    return true;
  return false;
}

function getScore(i, j, color) {
  return Math.max(
    colorChangeCheck(i, j, -1, 0, color).score,
    colorChangeCheck(i, j, 1, 0, color).score,
    colorChangeCheck(i, j, 0, -1, color).score,
    colorChangeCheck(i, j, 0, 1, color).score,
    colorChangeCheck(i, j, -1, -1, color).score,
    colorChangeCheck(i, j, -1, 1, color).score,
    colorChangeCheck(i, j, 1, -1, color).score,
    colorChangeCheck(i, j, 1, 1, color).score
  );
}

function colorChangeCheck(i, j, row, column, color, indexArray = []) {
  var toBeColored = false;

  i = i + row;
  j = j + column;
  while (i >= 0 && j >= 0 && i < 8 && j < 8) {
    if (document.getElementById("circle" + i + j).classList.contains("colored")) {
      circleColor = document.getElementById("circle" + i + j).classList[3].split("bg-")[1];

      if (circleColor === color) {
        toBeColored = true;
        break;
      }

      indexArray.push({ i: i, j: j });
      i = i + row;
      j = j + column;
    } else break;
  }

  return { toBeColored: toBeColored && indexArray.length > 0, score: indexArray.length };
}

function colorChanger(toBeColored, indexArray, color, oppositeColor) {
  if (toBeColored) {
    indexArray.forEach(value => {
      document.getElementById("circle" + value.i + value.j).classList.remove("bg-" + oppositeColor);
      document.getElementById("circle" + value.i + value.j).classList.add("bg-" + color);
    });
  }
}

function computerClick() {
  var score = [];
  var selected;
  sequenceArray1.forEach(val => {
    if (!document.getElementById("circle" + val.i + val.j).classList.contains("colored") && isClickable(val.i, val.j, "red")){
      let points = getScore(val.i, val.j, 'red');
      score.push(points);
    }
    else 
      score.push(0);
  });

  if(score.length > 0 && Math.max(...score) > 0)
    selected = sequenceArray1[score.indexOf(Math.max(...score))];

  else{
    score = [];
    sequenceArray2.forEach(val => {
      if (!document.getElementById("circle" + val.i + val.j).classList.contains("colored") && isClickable(val.i, val.j, "red")){
        let points = getScore(val.i, val.j, 'red');
        score.push(points);
      }
      else 
        score.push(0);
    });
  
    if(score.length > 0 && Math.max(...score) > 0)
      selected = sequenceArray2[score.indexOf(Math.max(...score))];

    else{
      score = [];
      sequenceArray3.forEach(val => {
        if (!document.getElementById("circle" + val.i + val.j).classList.contains("colored") && isClickable(val.i, val.j, "red")){
          let points = getScore(val.i, val.j, 'red');
          score.push(points);
        }
        else 
          score.push(0);
      });
    
      if(score.length > 0 && Math.max(...score) > 0)
        selected = sequenceArray3[score.indexOf(Math.max(...score))];

      else{
        score = [];
        sequenceArray4.forEach(val => {
          if (!document.getElementById("circle" + val.i + val.j).classList.contains("colored") && isClickable(val.i, val.j, "red")){
            let points = getScore(val.i, val.j, 'red');
            score.push(points);
          }
          else 
            score.push(0);
        });
      
        if(score.length > 0 && Math.max(...score) > 0)
          selected = sequenceArray4[score.indexOf(Math.max(...score))];
      }
    }
  }

  document.getElementById("circle" + selected.i + selected.j).classList.add("colored");
  document.getElementById("circle" + selected.i + selected.j).classList.add(bgColorClass);
  reverseAlgorithm(selected.i, selected.j, "red");
  bgColorClass = bgColorClass === "bg-red" ? "bg-blue" : "bg-red";
  displayResult();

}

function displayResult() {
  var red = 0;
  var blue = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (document.getElementById("circle" + i + j).classList.contains("bg-red")) {
        red++;
      } else if (document.getElementById("circle" + i + j).classList.contains("bg-blue")) {
        blue++;
      }
    }
  }

  document.getElementById("resultBlue").textContent = "Blue: " + blue;
  document.getElementById("resultRed").textContent = "Red: " + red;
}

function reset() {
  location.reload();
}
