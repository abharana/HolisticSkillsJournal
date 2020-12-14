## Attack Vectors that are avoided in Holistic Skills Journal
 
#### 1: Arithmetic Over/Under Flows:
The Ethereum Virtual Machine (EVM) specifies fixed-size data types for integers. This means that an integer variable, only has a certain range of numbers it can represent.
Holistic Skills Journal dapp stores several data elements in uint8 annd uint256 that can be exploited to attack the contract. The conventional technique to guard against under/overflow vulnerabilities is to use or build mathematical libraries which replace the standard math operators; addition, subtraction and multiplication (division is excluded as it doesn't cause over/under flows and the EVM reverts on division by 0).
Application uses OpenZeppellin's SafeMath library to avoid under/over flow vulnerabilities.