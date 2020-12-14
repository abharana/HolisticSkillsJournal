## Project Title: Holistic Skills Journal
 
#### Section 1: Project summary:
The project allows users to capture some of their Skills (Creative, Cognitive, Social, Emotional & Physical) in the form of a Journal, that would allow them to visit time and again and reflect on their holistic development.

#### Section 2: Project description and use cases:
##### User roles: 
* Admin 
* Skilled User
* Skill Certifier
* Skill Campaigner

##### Use cases:

* **Admin**: Admins can pause and redeploy application.
* **Skilled User**: Skilled users can capture skills that they are good at and will request other users to certify their skills.
* **Skill Certifier**: Skill Certifier can approve the skills exhibited by the skilled person against a rubric and will provide a rating and add comments.
* **Skill Campaigner**: Skill Campaigner will create campaigns with a specific skill or a combination of skills under different categories enabling users to participate in the challenge 


#### Section 3: Project folder structure:

###### Contracts folder: 
* **1** Migrations.sol: Truffle generated contract
* **2** UserRegister.sol : This contract stores all the users of the application, associate Name with the account and capture all skills for the user.
UserRegister.sol inherits OpenZeppelin contract library, for Pausing, assigning Owner and Role Based Access.
* **2** SkillEvaluation.sol : This contract will store the Skill details and allows users to create and certify skills.
SkillEvaluation.sol SkillEvaluation inherits OpenZeppelin contract library, for SafeMath operations.

###### dapp folder: 
Front-end application has been built with Angular 9 and Angular Material. Application folder strucuture is as below.
* **1)** e2e : Automated e2e scripts go here. It has not been implemented.
* **2)** src/app/components : contains html and components for screens along with jasmine tests(not implemented).
* **3)** src/app/services : contains services that will interact with the blockchain network.
* **3)** src/app : contains all the routing logic for components

#### Section 4: Other documents:
* **1)**: avoiding_common_attacks.md ** : How common security attacks have been avaoided in my implementation of Marketplace solidity smart contract
* **2)**: design_pattern_decisions.md ** : Lists the various design patterns adopted in the smart contracts.
* **3)**: deployed_addresses.txt**: Contains the addresses of deployed contracts and test accounts in Rinkeby test network.

#### Section 5: Prerequisites:
* **1)** Install Ganache and metamask plug-in for browser.
* **2)** Generate a 12 word Nmnemonic that will be used to create HD Wallet addresses in Ganache
* **3)** Start Ganache on port 8545 with the 12 word mnemonic created.
* **4)** Connect metamask to Ganache server at http://localhost:8545
* **5)** Import the first 4 accounts from the HD wallet into Metamask (using private key import) and verify that the balance on metamask for the account is the same as that shown in ganache.

#### Section 7: How to set it up locally?
**Step 1:** Clone the repo to local machine:
* git clone https://github.com/

**Step 2:**  Start up ganache (Gui or cli).
* Please ensure to configure your ganache to run on port 8545*

**Step 3:** install node components (includes OpenZeppelin contract library and other dependencies)
* npm install


**Step 4:** Compile contracts
* truffle compile

**Step 5** Deploy contracts
* truffle migrate (or truffle migrate --reset 'if you need to update the contract changes')

**Step 6** Test contracts 
* truffle test 
*note: All tests should pass*

**Step 7** install node components for Angular web application
* cd dapp 
* npm install 

**Step 7** Start Angular application server
* **ng serve**
* This will start up server. You can abort server with Ctrl-C.


* Go to http://localhost:4200 
* Note: application can be run only on browsers with metamask plug=in installed.

#### Section 8: How to test DApp?
* **Load Ethereum account from Metamask**: On startup screen verify that the account shown  on screen is the same as the account selected on metamask.
* **Owner Details**: This would show the account from which contract was deployed. It defaults to first account in ganache.
* **Register Account**: All metamask accounts will be registered to use the Dapp with a Name using the Register Account button. If the account has been previously registered it will display the registered name.

**Left Navigation Options**: 

* ** Capture a Skill**: This screen will be used by the user to capture his skill details that he plans to add to his skill journal. Once a skill has been added, a URL will be generated that can be used for broadcasting the Skill to certifiers.
* ** Certify a users Skill**: This option will be opened by default if a Certifier clicks on the URL that was provided to him for approval. The certifier can capture additional details and give a rating based on a rubric with some comments.
* ** List my Skills**: If a users skill has been certified, he will be able to view his skills and details about the rating he has received and the issuers name.
* ** View Registered Users**: To be implemented
* ** Sponsor a Skill Campaign**: To be implemented
* ** Enroll into a Skill Campaign**: To be implemented

#### Section 9: Future Improvements?
* **1)** Implement Skill campaign related functionality within smart contracts and web application. 
* **2)** Implement Role Based Access Control (OpenZeppelin contracts) in smart contracts and web application.
* **3)** Implement Self Sovereign Identity (using uPort)
* **4)** Implement IPFS for storing user specific data and skill badges from campaigns
* **5)** Implement Gas Station Network (OpenZeppelin contracts) for cases where users are recoding skills without enrolling into campaigns.
