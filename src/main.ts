// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import unclickedUrl from "./assets/unclickedCat.svg?no-inline";
import clickedUrl from "./assets/clickedCat.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = unclickedUrl;
image.alt = "A calico cat";
image.width = 96;
image.height = 96;

// Make the image respond to clicks.
image.style.cursor = "pointer";

// Change the image's appearance while the mouse is pressed.
image.addEventListener("mousedown", () => {
  image.src = clickedUrl;
});

// Restore the original appearance when the mouse is released.
image.addEventListener("mouseup", () => {
  image.src = unclickedUrl;
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

const upgradeContainer = document.createElement("div"); //create container to display upgrade buttons
upgradeContainer.style.display = "grid";
upgradeContainer.style.gridTemplateColumns = "200px 200px 200px 200px 200px";
upgradeContainer.style.gap = "15px";

class Upgrade {
  name: string;
  cost: number;
  button: HTMLButtonElement;

  constructor(
    name: string,
    cost: number,
    container: HTMLDivElement,
    repeat: boolean,
  ) {
    this.name = name;
    this.cost = cost;

    this.button = document.createElement("button");
    this.button.style.whiteSpace = "pre-line";
    this.button.style.width = "200px";
    this.button.title =
      `title needs to be replaced with flavor text in ${this.name}`;
    container.append(this.button);

    this.button.addEventListener("click", () => {
      if (count >= this.cost) {
        this.buyUpgrade();
        updateProductionDisplays();
      }
    }, {
      once: repeat,
    });
  }

  //accessing parts of the class directly to change them felt kind of wrong, so I made this a method instead
  setHoverText(text: string) {
    this.button.title = text;
  }

  buyUpgrade() {
    throw new Error(
      `buyUpgrade() needs to be defined in ${this.name}`,
    );
  }
}

class HelperUpgrade extends Upgrade {
  rateAdd: number;
  numOwned: number;

  constructor(name: string, cost: number, rateAdd: number) {
    super(name, cost, upgradeContainer, false);
    this.rateAdd = rateAdd;
    this.numOwned = 0;
    this.updateButtonText();
  }

  override buyUpgrade(): void {
    count -= this.cost;
    total += this.rateAdd;
    this.numOwned++;
    this.cost *= 2;
    this.updateButtonText();
  }

  updateButtonText() {
    this.button.textContent = `${this.name}
      Cost: ${this.cost}
      Owned: ${this.numOwned}
      Each ${this.name} adds ${this.rateAdd} fish per second`;
  }
}

class UpgradeForUpgrade extends Upgrade {
  mult: number;
  upgrade: HelperUpgrade;

  constructor(
    name: string,
    cost: number,
    container: HTMLDivElement,
    mult: number,
    upgrade: HelperUpgrade,
  ) {
    super(name, cost, container, true);
    this.mult = mult;
    this.upgrade = upgrade;
    this.button.textContent = `${this.name}
    Cost: ${this.cost}`;
  }

  override buyUpgrade(): void {
    count -= this.cost;
    total += this.upgrade.rateAdd * this.upgrade.numOwned * (this.mult - 1);
    this.upgrade.rateAdd = this.upgrade.rateAdd * this.mult;
    this.upgrade.updateButtonText();
    this.button.textContent = `${this.name}
    SOLD OUT`;
    this.setHoverText("You already have this upgrade!");
  }
}

class UpgradeForClick extends Upgrade {
  rateAdd: number;
  constructor(
    name: string,
    cost: number,
    container: HTMLDivElement,
    rateAdd: number,
  ) {
    super(name, cost, container, false);
    this.rateAdd = rateAdd;
    this.button.textContent = `${this.name}
    Cost: ${this.cost}`;
  }

  override buyUpgrade(): void {
    count -= this.cost;
    clickValue += this.rateAdd;
    updateProductionDisplays();
    this.button.textContent = "SOLD OUT";
    this.setHoverText("You already have this upgrade!");
  }
}

const fishercat: HelperUpgrade = new HelperUpgrade("Fisher Cat", 10, 1);
fishercat.setHoverText(
  "Fisher Cats are cats that you can hire to fish for you...For the right price, of course.",
);

const farmercat: HelperUpgrade = new HelperUpgrade("Farmer Cat", 25, 5);
farmercat.setHoverText(
  "Fish enthusiasts turned breeders, Farmer Cats own ponds of exotic fish and will happily give you some of the ones that are not up to their aesthetic standards if you provide some first.",
);

const wizardcat: HelperUpgrade = new HelperUpgrade("Wizard Cat", 100, 20);
wizardcat.setHoverText(
  "Wizard Cats are former familiars who decided to take up the study of magic themselves, mostly because they wanted to summon portals to dimensions with more fish. They'll agree to give you some of these otherwordly fish if you provide the supplies for their spells.",
);

const scientistcat: HelperUpgrade = new HelperUpgrade(
  "Scientist Cat",
  1000,
  50,
);
scientistcat.setHoverText(
  "Scientist Cats have dedicated their lives to the pursuit of knowledge...on how to best clone fish. Due to the fact that the subjects of their research often get eaten before any meaningful analysis can be done, they've struggled to get grants. They're willing to share some of their cloned fish if you fund their research efforts.",
);

const clickUpgrade1: UpgradeForClick = new UpgradeForClick(
  "Sharper Claws",
  500,
  upgradeContainer,
  1,
);
clickUpgrade1.setHoverText(
  "Your cat has scratched the number '500' into the wall of your bedroom and has left a dead fish lying on the floor beneath the message. After noticing you staring at the bizarre scene, your cat skips away and comes back with a sharpening stone. She looks between you, the wall, and her paws, and meows. Her message is clear: if you give me 500 fish, I'll sharpen my claws so I can catch fish better.",
);

new UpgradeForUpgrade("Metal fishing rods", 20, upgradeContainer, 2, fishercat);

app.append(
  heading,
  image,
  counter,
  productionDisplay,
  clickValueDisplay,
  upgradeContainer,
);

requestAnimationFrame(update);
updateProductionDisplays();
