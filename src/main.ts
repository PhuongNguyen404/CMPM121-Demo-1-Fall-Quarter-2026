// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
import tileClickedUrl from "./assets/tileClicked.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

// Make the image respond to clicks.
image.style.cursor = "pointer";

// Change the image's appearance while the mouse is pressed.
image.addEventListener("mousedown", () => {
  image.src = tileClickedUrl;
});

// Restore the original appearance when the mouse is released.
image.addEventListener("mouseup", () => {
  image.src = tileUrl;
});

let count = 0; //currency count
const clickValue = 1; //the amount of currency gained per click
const total = 1; //total production rate, starts at 1 click per second

const counter = document.createElement("p"); //create a new paragraph element to display the currency count
counter.textContent = `Clicks: ${count}`; //display the initial count in the counter element

const productionDisplay = document.createElement("p");
productionDisplay.textContent = `Total Production: ${total} / second`; //display the initial production rate in the production display element

const clickValueDisplay = document.createElement("p");
clickValueDisplay.textContent = `Click Value: ${clickValue} / click`; //display the initial click value in the click value display element

image.addEventListener("click", () => { //Behavior when button is clicked
  console.log("Image clicked!");
  count = count + clickValue; //increment count when clicked
  counter.textContent = `Clicks: ${count}`; //display the count in the counter element
});

let previousTime: number | undefined; //will store the previous frame's timestamp, starts undefined

function update(timestamp: number) {
  if (previousTime !== undefined) { //check whether a previous timestamp exists
    const elapsedSeconds = (timestamp - previousTime) / 1000; //find time since previous frame in seconds

    count = count + total * elapsedSeconds; //increase count based on amount of time as passed. Will start at 1/ sec
    counter.textContent = `Clicks: ${Math.floor(count)}`; //display counter as a whole number
  }

  previousTime = timestamp; //update previous time based on time passed
  requestAnimationFrame(update);
}

app.append(heading, image, counter, productionDisplay, clickValueDisplay);

requestAnimationFrame(update);
