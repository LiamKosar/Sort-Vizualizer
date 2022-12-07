//defines the parameters for a rectangle
class rect {
  constructor(x) {
    this.height = Math.floor(Math.random() * 500 + 1);
    this.width = barWidth;
    this.y = canvasHeight - this.height;
    this.x = x * barWidth;
  }
}

//gets the info for the canvas that the squares are
//drawn on
let canvas = document.getElementById("canvas");
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight;
let ctx = canvas.getContext("2d");
let originalColor = "#1c5150";
let completeColor = "orange";
ctx.fillStyle = originalColor;
let barWidth = 2;
let numBars = canvasWidth / barWidth;
let animationSpeed = 8;
let rectArray = makeRects();
drawRects(rectArray);
let running = false;

//ui buttons for starting/resetting the sorts

let sortChangeButton = document.getElementById("dropbtn");
let selectionSortButton = document.getElementById("option1");
let bubbleSortButton = document.getElementById("option2");
let quickSortButton = document.getElementById("option3");
let insertionSortButton = document.getElementById("option4");
let resetButton = document.getElementById("reset");

selectionSortButton.addEventListener("click", () => {
  if (!running) {
    sortChangeButton.innerHTML = "Selection Sort";
    running = true;
    selectionSort(rectArray);
  }
});

bubbleSortButton.addEventListener("click", () => {
  if (!running) {
    sortChangeButton.innerHTML = "Bubble Sort";
    running = true;
    bubbleSort(rectArray);
  }
});

quickSortButton.addEventListener("click", () => {
  if (!running) {
    sortChangeButton.innerHTML = "Quick Sort";
    running = true;
    quickSort(rectArray);
  }
});

insertionSortButton.addEventListener("click", () => {
  if (!running) {
    sortChangeButton.innerHTML = "Insertion Sort";
    running = true;
    insertionSort(rectArray);
  }
});

resetButton.addEventListener("click", () => {
  window.location.reload();
});

//makes the array of retangles
function makeRects() {
  let i = 0;
  let rectArray = [];
  while (i < numBars) {
    rectArray.push(new rect(i));
    i++;
  }
  return rectArray;
}

//does the initial render of all the rects
function drawRects(rectArray, color) {
  if (color != null) {
    ctx.fillStyle = color;
  }
  let i = 0;
  while (i < rectArray.length) {
    ctx.fillRect(
      rectArray[i].x,
      rectArray[i].y,
      rectArray[i].width,
      rectArray[i].height
    );
    i++;
  }

  ctx.fillStyle = originalColor;
}

//selection sort
function selectionSort(rectArray) {
  let i = 0;
  let animation = setInterval(lol, animationSpeed);

  function lol() {
    let min = rectArray[i];
    let minPosition = i;
    let j = i + 1;

    while (j < numBars) {
      if (rectArray[j].height < min.height) {
        min = rectArray[j];
        minPosition = j;
      }
      j++;
    }

    if (minPosition != i) {
      rectArray = swapRect(
        rectArray[i],
        rectArray[minPosition],
        i,
        minPosition,
        rectArray,
        true
      );
    } else {
      ctx.fillStyle = completeColor;
      ctx.fillRect(min.x, min.y, min.width, min.height);
      ctx.fillStyle = originalColor;
    }
    i++;
    if (i >= numBars - 1) {
      let temp = rectArray[rectArray.length - 1];
      ctx.fillStyle = completeColor;
      ctx.fillRect(temp.x, temp.y, temp.width, temp.height);
      ctx.fillStyle = originalColor;
      window.clearInterval(animation);
    }
  }
}

//bubba sort
function bubbleSort(rectArray) {
  let i = 0;
  let j = numBars;
  let animation = setInterval(lol, 20);

  function lol() {
    let final = rectArray[i];
    while (i < j - 1) {
      if (rectArray[i].height > rectArray[i + 1].height) {
        rectArray = swapRect(
          rectArray[i],
          rectArray[i + 1],
          i,
          i + 1,
          rectArray
        );
      } else {
        final = rectArray[i + 1];
      }
      i++;
    }
    ctx.fillStyle = completeColor;
    ctx.fillRect(final.x, final.y, final.width, final.height);
    ctx.fillStyle = originalColor;
    i = 0;
    j--;

    if (!(j > 0)) {
      window.clearInterval(animation);
    }
  }
}

function quickSort(rects) {
  //base case if the array is only 1 long, meaning
  //there is nothing left to sort
  if (rects.length < 2) {
    ctx.fillStyle = completeColor;
    ctx.fillRect(rects[0].x, rects[0].y, rects[0].width, rects[0].height);
    ctx.fillStyle = originalColor;
    return;
  }

  //pivot is chosen, in this case the pivot is always the
  //right-most value in the array
  let pivot = rects[rects.length - 1];
  let pivotHeight = pivot.height;

  //arrays to hold rectangles
  //to the left and right
  let left = [];
  let right = [];

  //if the hight of the rectangle is > the pivot,
  //it gets put in the right array.
  for (let i = 0; i < rects.length - 1; i++) {
    if (rects[i].height < pivotHeight) {
      left.push(rects[i]);
    } else {
      right.push(rects[i]);
    }
  }

  //repositioning the pivot
  //by putting it between the left and right array
  let newPivotX = pivot.x - right.length * barWidth;
  ctx.clearRect(pivot.x, pivot.y, pivot.width, pivot.height);
  pivot.x = newPivotX;

  //this is just for animation purposes, technically not part of the quicksearch
  //rearranging the x positions of the rectangles so they are in the right spot
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (left[i] != null) {
      let current = left[i];
      ctx.clearRect(current.x, current.y, current.width, current.height);
      current.x = pivot.x - left.length * barWidth + i * barWidth;
    }

    if (right[i] != null) {
      let current = right[i];
      ctx.clearRect(current.x, current.y, current.width, current.height);
      current.x = pivot.x + (i + 1) * barWidth;
    }
  }

  //fills the pivot in because it is in its final location
  ctx.fillStyle = completeColor;
  ctx.fillRect(pivot.x, pivot.y, pivot.width, pivot.height);
  ctx.fillStyle = originalColor;

  //draws the new rectangle array, in the correct order
  drawRects([...left, ...right]);

  //recursive calls which occur every 250ms to slow down the sort so that
  //the eye can see it
  setTimeout(quickSort, 250, right);
  setTimeout(quickSort, 250, left);
}

function randomSort(rects) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  let didItWorkFinally = true;
  for (let i = 0; i < rects.length - 1; i++) {
    if (rects[i].height > rects[i + 1].height) {
      didItWorkFinally = false;
    }
  }

  if (didItWorkFinally) {
    drawRects(rects, completeColor);
  } else {
    let newRects = [];
    let tempLength = rects.length;
    for (let i = 0; i < tempLength; i++) {
      let index = Math.floor(Math.random() * rects.length);
      let tempRect = rects.splice(index, 1)[0];
      tempRect.x = i * barWidth;
      newRects.push(tempRect);
    }
    drawRects(newRects);
    setTimeout(randomSort, 10, newRects);
  }
}

// swaps the rects within the array and on the canvas, used in the bubble sort and selection sort functions
function swapRect(rect1, rect2, pos1, pos2, rectArray, changeColors) {
  ctx.clearRect(rect1.x, rect1.y, rect1.width, rect1.height);
  ctx.clearRect(rect2.x, rect2.y, rect2.width, rect2.height);

  let x1 = rect1.x;
  let x2 = rect2.x;
  rect1.x = x2;
  rect2.x = x1;

  rectArray[pos1] = rect2;
  rectArray[pos2] = rect1;

  ctx.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
  if (changeColors) {
    ctx.fillStyle = completeColor;
  }
  ctx.fillRect(rect2.x, rect2.y, rect2.width, rect2.height);
  ctx.fillStyle = originalColor;

  return rectArray;
}

//does the insertion sort on the rectangles
function insertionSort(rects) {
  let length = rects.length;

  //slows down the sort so you can see it
  let animation = setInterval(animate, 10);
  let i = 0;
  function animate() {
    let currentRect = rects[i];

    let j = i - 1;

    //moves the j pointer to the left and moves the rectangles to
    //the right while the rectangle at index j is taller than the
    //rectangle at indext i
    while (j >= 0 && currentRect.height < rects[j].height) {
      rects[j + 1] = rects[j];
      rects[j + 1].x += barWidth;
      j--;
    }
    rects[j + 1] = currentRect;
    rects[j + 1].x = barWidth * (j + 1);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawRects(rects);

    //exits the animation loop when all of the rectangles
    //have been sorted
    if (i + 1 == length) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawRects(rects, "orange");
      window.clearInterval(animation);
    }
    i++;
  }
}
