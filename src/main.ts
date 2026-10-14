// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
import tileClickedUrl from "./assets/tileClicked.svg?no-inline";
const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img"); //image to be clicked, PLACEHOLDER
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
let clickValue = 1; //the amount of currency gained per click
let total = 1; //total production rate, starts at 1 click per second

//create elements to display the current count, total production, and click value
const counter = document.createElement("p");
const productionDisplay = document.createElement("p");
const clickValueDisplay = document.createElement("p");

image.addEventListener("click", () => { //Behavior when button is clicked
  console.log("Image clicked!");
  count = count + clickValue; //increment count when clicked
  updateProductionDisplays(); //update displays with new values
});

function updateProductionDisplays() { // Updates displays with current values of count, total production, and click value.
  counter.textContent = `Treats: ${Math.floor(count)}`;
  productionDisplay.textContent = `Treats per second: ${total}`;
  clickValueDisplay.textContent = `Treats each click: ${clickValue}`;
}

let previousTime: number | undefined; //will store the previous frame's timestamp, starts undefined

function update(timestamp: number) {
  if (previousTime !== undefined) { //check whether a previous timestamp exists
    const elapsedSeconds = (timestamp - previousTime) / 1000; //find time since previous frame in seconds

    count = count + total * elapsedSeconds; //increase count based on amount of time as passed. Will start at 1/ sec
    updateProductionDisplays(); //update displays with new values
  }

  previousTime = timestamp; //update previous time based on time passed
  requestAnimationFrame(update);
}

const upgradesContainer = document.createElement("div"); //create container to display upgrade buttons
upgradesContainer.style.display = "flex";
upgradesContainer.style.gap = "15px";

type Upgrade = {
  description: string;
  name: string;
  cost: number;
  increase: number;
  owned: number;
  effect: "production" | "clickValue"; //type of effect the upgrade has, either increasing production or click value
};

const upgrades: Upgrade[] = [ //array to hold all the upgrades available in the game
  {
    description: "Automatically produces more treats.",
    name: "Kibble Bowl",
    cost: 10,
    increase: 1,
    owned: 0,
    effect: "production",
  },
  {
    description: "Automatically produces more treats.",
    name: "Automatic Feeder",
    cost: 25,
    increase: 5,
    owned: 0,
    effect: "production",
  },
  {
    description: "Automatically produces more treats.",
    name: "Cat Cafe",
    cost: 100,
    increase: 20,
    owned: 0,
    effect: "production",
  },
  {
    description: "Increases the value of each click.",
    name: "Premium Catnip",
    cost: 500,
    increase: 1,
    owned: 0,
    effect: "clickValue",
  },
  {
    name: "Luxury Cat Bed",
    description: "A comfy bed that helps your cat earn even more treats.",
    cost: 2000,
    increase: 50,
    owned: 0,
    effect: "production",
  },
];

upgrades.forEach((upgrade) => { //create a button for each upgrade
  const button = document.createElement("button"); //create a button element for each upgrade

  function updateButton() { //update text for each button based on the upgrade's current state
    button.textContent =
      `${upgrade.name} - ${upgrade.description} | Cost: ${upgrade.cost} | Owned: ${upgrade.owned}`;
  }

  button.addEventListener("click", () => { //create a listener for each respective button
    if (count >= upgrade.cost) { //if the player has enough currency to purchase the upgrade
      count -= upgrade.cost;
      upgrade.owned++;

      if (upgrade.effect === "production") { //handles production increases
        total += upgrade.increase;
      } else if (upgrade.effect === "clickValue") { //handles click value increases
        clickValue += upgrade.increase;
      }

      upgrade.cost *= 2; //double the cost of the upgrade after each purchase

      updateProductionDisplays();
      updateButton();
    }
  });
  updateButton();
  upgradesContainer.append(button);
});

app.append(
  heading,
  image,
  counter,
  productionDisplay,
  clickValueDisplay,
  upgradesContainer,
);

requestAnimationFrame(update);
updateProductionDisplays();
