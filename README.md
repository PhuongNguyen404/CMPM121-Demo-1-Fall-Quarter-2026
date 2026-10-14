# D1 starter

Directions: Click the cat image to earn fish. fish are also earned automatically over time. Spend fish on upgrades to increase fish per second or the number of fish earned per click. Upgrade costs increase after each purchase.

Browser hyperlink: [Cat Clicker Game](https://saosako-school.github.io/CMPM121-Demo-1-Fall-Quarter-2026/)

## Shared Behavior

src/main.ts: Contains the main game logic, currency displays, and upgrade definitions.

src/assets/: Contains the images used for the clickable cat.

Upgrade: Handles upgrade buttons, purchase checks, and hover descriptions.

HelperUpgrade: Handles upgrades that increase automatic production and tracks ownership and costs.

UpgradeForUpgrade: Improves the production of another upgrade.

UpgradeForClick: Increases the currency earned per click.

Requirements: Node.js and npm.

## Requirements

Install dependencies: npm install

Start the development server: npm run dev

Build for production: npm run build

Run project checks: deno task ci

## Credits

Art Credits: Sydney Osako\
Contributors: Sydney Osako, Tim Phan

## Important Commits and Their Revisions

Commit #2: [Add click counter and automatic currency production, created clickable button using image](https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/e029719cf017107cfa27106dc2482f58e6230216)\
We added the basic clicker game mechanics here. The image changes when pressed, clicking it increases the currency count, and automatic production generates currency over time using requestAnimationFrame(). It also added displays for the current currency, production rate, and currency earned per click. At this state, there were a lot of placeholder names as a theme was not established.

Commit #3: [Added progression through upgrades](https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/3fbc090927cd96b909b45d01239f1f39e2d8da18)\
Added upgrade progression to the clicker game. Players can spend currency on upgrades to increase automatic production or earn more currency per click. Each upgrade tracks how many times it has been purchased, and its cost doubles after each purchase. It also added updateDisplays() to refresh the currency count, production rate, and click value after buying upgradesto make it easier to update UI after each purchase.

Commit #4: [Turned upgrades into classes, added upgrades to upgrade upgrades](https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/b6cea68ffcc357080ac1ba7a4a5d64566a4f04a3)\
Created classes to handle the upgrades instead of just the functions. The base class, Upgrade, would create a button that would be added to the button container and an event listener for the button that would check if it had been clicked. Subclasses would have to override a function that would be called from within the callback attatched to the previously mentioned event listener. The subclasses written were each written to only be responsible for changing how fish were produced with regards to one aspect of fish production, following the SRP in this case. UpgradeForUpgrade only needs to be rewritten if we want to change the way we calculate how much of a boost these upgrades give to existing upgrades. HelperUpgrade only needs to change if we want to change the way that the cost is calculated.

Commit #5: [created class for upgrading the amount of currency got via clicks, made the button container display the buttons in a grid format, created 4 types of upgrades, made function that changes what text appears when hovering over upgrades](https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/eb2cd883c7a647583f0364e7a65f3ddef5f98b72)\
The biggest thing here is that we added another subclass, UpgradeForClick, that upgrades the amount of fish that could be earned per click of the cat. Similar to the other subclasses, this class only needs to change if the way we want to calculate the change to the fish per clicks changes. Everything else in this commit is mostly just formatting, rewording, or adding more upgrades for the player to interact with.

Commit #6: [Updated Display names to fit theme and removed uncessary code](https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/aaa06c2c22eb9567e9a11d6088d5060eed9c6772)\
We removed some redundant code that was unncessary due to the usage of updateProductionDisplays();

Commit #9: [added cat assets](https://github.com/saosako-school/CMPM121-Demo-1-Fall-Quarter-2026/commit/c5b3e89773786531a8eff2c37e6fc140c0edcac2)\
Added assets drawn by Sydney to represent the clickable object.

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
