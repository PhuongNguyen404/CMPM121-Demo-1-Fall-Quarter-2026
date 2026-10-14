# D1 starter

Directions: Click the cat image to earn fish. fish are also earned automatically over time. Spend fish on upgrades to increase fish per second or the number of fish earned per click. Upgrade costs increase after each purchase.

Browser link: https://saosako-school.github.io/CMPM121-Demo-1-Fall-Quarter-2026/

## Shared Behavior

src/main.ts: Contains the main game logic, currency displays, and upgrade definitions.

src/assets/: Contains the images used for the clickable cat.

Upgrade: Handles upgrade buttons, purchase checks, and hover descriptions.

HelperUpgrade: Handles upgrades that increase automatic production and tracks ownership and costs.

UpgradeForUpgrade: Improves the production of another upgrade.

UpgradeForClick: Increases the currency earned per click.

Requirements: Node.js and npm.

# Requirements

Install dependencies: npm install

Start the development server: npm run dev

Build for production: npm run build

Run project checks: deno task ci

## Credits

Art Credits:
Contributors: Sydney Osako, Tim Phan

## Revisions

We added the basic clicker game mechanics here. The image changes when pressed, clicking it increases the currency count, and automatic production generates currency over time using requestAnimationFrame(). It also added displays for the current currency, production rate, and currency earned per click. At this state, there were a lot of placeholder names as a theme was not established.
https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/e029719cf017107cfa27106dc2482f58e6230216

Added upgrade progression to the clicker game. Players can spend currency on upgrades to increase automatic production or earn more currency per click. Each upgrade tracks how many times it has been purchased, and its cost doubles after each purchase. It also added updateDisplays() to refresh the currency count, production rate, and click value after buying upgradesto make it easier to update UI after each purchase.

We removed some redundant code that was unncessary due to the usage of updateProductionDisplays();
https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/aaa06c2c22eb9567e9a11d6088d5060eed9c6772

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
