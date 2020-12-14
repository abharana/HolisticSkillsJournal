// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0;

/* 
    Import UserRegister contract to associate User with a skill
*/
import "./UserRegister.sol";

/* 
    Import SafeMath from the OpenZeppelin Contracts library for addressing security vulnerabilities
*/
import "@openzeppelin/contracts/math/SafeMath.sol";

/* @title Create and certify user's skill with all relevant details
   @author ab64dev
   @dev All function calls are currently implemented without side effects
*/
contract SkillEvaluation {

    /// using SafeMath to address issues with Arithmetic Over/Under flows for uint datatypes 
    using SafeMath for uint8;
    using SafeMath for uint256;

    /* 
        @notice Category identifies all possible Skill groupings considered for holistic growth
        Creative
        Social
        Physical
        Cognitive
        Emotional
    */
    enum Category { Creative, Social, Physical, Cognitive, Emotional }

    /* 
        @notice Captures different states that the Skill will transition into in order
        NEW - Default state when the contract is initialized.
        CREATED - user account has been associated with the contract
        CERTIFIED - user skill has been certified by a skill certifier
        RECERTIFIED - user skill has been certified more than once
    */
    enum State { NEW, CREATED, CERTIFIED, RECERTIFIED }
    
    /*
        Skill object
        stores skill identifier(auto incremented), 
        skill name, skill Category, skill rating, skill state, skill creator and skill issuer details
    */
    struct Skill {
        uint256 id;
        string name;
        Category category;
        uint8 rating;
        State state;
        address skilledPerson;   // address of the skilled user
        address[] skillIssuers;  // array of account addresses who have issued the skill
        uint256 noOfValidations;
    }

    /*
        User Register contract for retreiving user name
    */
    UserRegister userRegisterContract;

    /*
        list of skills with skill identifer as keys
    */
    mapping (uint256 => Skill) public skill;

    /*
        Skill identifier
    */
    uint256 skillId;

    /*
        Skill owner
    */
    address owner;

    /* 
        @notice Create event to publish skill creation event
        @param skill identifier
    */
    event skillCreated(uint256 indexed skillId);

    /* 
        @notice Create event to publish skill certification event
        @param skill identifier
    */
    event skillCertified(uint256 indexed skillId);

    /*
        VerifyIssuer should require that the address passed is not of the msg.sender
    */
    modifier verifyIssuer (address _address) { 
        require (_address != msg.sender, "Skill owner cannot certify himself");
         _;
        }
    
    /*
        VerifyState to ensure state transitions are valid
        @param skill identifier
        @param current state before execution
    */
    modifier verifyState(uint256 _skillId, State _state) {
        require(skill[_skillId].state == _state, "Invalid state transition");
        _;
    }

    /*
        Load UserRegister's deployed address to create a contract instance and initialize skill identifer 
        @param userRegister contract deployed address
    */
    constructor(address userRegisterAddress) public{
        owner = msg.sender;
        skillId = 0;
        userRegisterContract = UserRegister(userRegisterAddress);
    }

    /*
        @notice Create a new skill  
        @param name of the skill
        @param skill category
        @return newly created Skill Identifier
    */
    function createSkill(string memory _skillName, Category _skillCategory) public returns(uint256){
        emit skillCreated(skillId);
        skill[skillId].id = skillId;
        skill[skillId].name = _skillName;
        skill[skillId].category = _skillCategory;
        skill[skillId].skilledPerson = msg.sender;
        skill[skillId].noOfValidations = 0;
        skill[skillId].state = State.CREATED;
        skillId = skillId + 1;
        return skillId;
    }

    /*
        @notice Certify a skill 
        @param skill identifier
        @param skill rating
        @param override skill category as applicable
        @return skill certification status
    */
    function certifySkill(uint256 _skillId, uint8 _rating, Category _category) public verifyIssuer(skill[_skillId].skilledPerson) returns(bool) {
        emit skillCertified(_skillId);
        skill[_skillId].rating = _rating;
        skill[_skillId].category = _category;
        skill[_skillId].skillIssuers.push(msg.sender);
        
        if (skill[_skillId].state == State.CREATED) {
            skill[_skillId].state = State.CERTIFIED;
            userRegisterContract.setSkill(skill[_skillId].skilledPerson, _skillId);
        } else {
            skill[_skillId].state = State.RECERTIFIED;
        }
        return true;
    }

    /*
        @notice Get list of Skill certifiers who have issued the skill certification
        @param skill identifier
        @return list of issuer addresses
    */
    function getSkillIssuers(uint256 _skillId) public view returns (address[] memory) {
        address[] memory issuers = new address[](skill[_skillId].skillIssuers.length);

        uint issuerIndex = 0;

        for(uint i = 0; i < skill[_skillId].skillIssuers.length;  i++) {
            issuers[issuerIndex] = skill[_skillId].skillIssuers[i];
            issuerIndex++;
        }
        return issuers;
    }

}