## Smart Contract Design patterns used
 
#### 1: Security Pattern: Circuit Breaker:
Holistic Skills Journal application implements the circuit breaker pattern to give the owner the ability to stop all state-changing functionalities during emergencies and discoveries of critical bugs.
The implementation is provided by extending the Ownable and Pausable contracts from OpenZeppelin contract library and further overriding the functions pauseContract() and unPauseContract() and decorated with modifiers inherited from Ownable contract.


#### 2: Behavioural Pattern: State Machine Pattern:
Holistic Skills Journal application implements the state machine pattern to ensure the skills are created, recorded and updated throughout the lifecyle with appropriate state transitions. 
The Skills start with the State as NEW and later transition into CREATED, CERTIFIED and RECERTIFIED state based on several state changing transactions.