// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0;

/* 
    Import Ownable, AccessControl and Pausable from the OpenZeppelin Contracts library
*/
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/* 
    @title A Register containing all Application Users
    @author ab64dev
    @notice Associate a name and skill details to an ethereum account
    @dev All function calls are currently implemented without side effects
*/
contract UserRegister is Ownable, Pausable, AccessControl {
    
    /* 
        Roles that will be assigned to users of the application. 
    */
    bytes32 public constant SKILLCREATOR_ROLE = keccak256("SKILLCREATOR_ROLE");
    bytes32 public constant SKILLCERTIFIER_ROLE = keccak256("SKILLCERTIFIER_ROLE");
    bytes32 public constant CAMPAIGNCREATOR_ROLE = keccak256("CAMPAIGNCREATOR_ROLE");

    /*
        Grant the contract deployer the default admin role: it will be able to grant and revoke any roles
    */
    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /*
        User objet
        stores name, registeredFlag(set) and user's skills
    */
	struct User {
        string name;
        bool set;
        uint256[] skills;
    }
    
    /*
        List of users registered with the application
    */
    mapping (address => User) public users;

    /* 
        Create event to publish users registration with the application.
    */
    event userRegistered (address indexed _address);

    /*
        VerifyCaller should require that the address passed is not of the msg.sender
    */
    modifier verifyCaller (address _address) { 
        require (_address != msg.sender, "Skill owner cannot add skills");
         _;
        }

    /* 
        @notice function can be called only by the owner to pause the contract execution.
    */
    function pauseContract() public onlyOwner {
        Pausable._pause();
    }

    /* 
        @notice function can be called only by the owner to unPause the contract execution.
    */
    function unPauseContract() public onlyOwner {
        Pausable._unpause();
    }

    /* 
        @notice function has been overriden to not allow Owner to renounce Ownership.
        @dev overrides inherited functionality to do nothing
    */
    function renounceOwnership() public override onlyOwner {}

    /* 
        @notice function has been overriden to not allow Owner to transfer Ownership.
        @dev overrides inherited functionality to do nothing
    */
    function transferOwnership(address newOwner) public override onlyOwner {}

    /* 
        @notice Associate a user name to an ethereum account
        @param ethereum account address
        @param user Name
        @return flag indicating transaction status
    */
	function registerUserAccount(address _userAddress, string memory _userName) whenNotPaused public returns (bool success){
        User storage user = users[_userAddress];
        // Check that the user has not registered previously:
        require(!user.set, "User has been registered previously");
        
        //Store the user details
        users[_userAddress].name = _userName;
        users[_userAddress].set = true;
        emit userRegistered (_userAddress);
        return true;
    }

    /* 
        @notice Get the number of skills for user 
        @param ethereum account address
        @return number of skills
    */
    function getSkillCount(address _userAddress) public view returns (uint) {
        return users[_userAddress].skills.length;
    }
    
    /* 
        @notice Get user details
        @param ethereum account address
        @return Name of the user and Registration status.
    */
    function getUser(address _userAddress) public view returns (string memory, bool) {
        return (users[_userAddress].name, users[_userAddress].set);
    }

     /* 
        @notice Assign a skill to a user account.
        @param ethereum account address
        @param Skill Identifier
        @return status of the transaction.
    */
    function setSkill(address _userAddress, uint256 _skillId) public verifyCaller(_userAddress) returns (bool) {
        users[_userAddress].skills.push(_skillId);
        return true;
    }

     /* 
        @notice get all skill details that are associated with the user account.
        @param ethereum account address
        @return a list if Skill identifiers
    */
    function getUserSkills(address _userAddress) public view returns (uint[] memory) {
        uint[] memory skills = new uint[](users[_userAddress].skills.length);

        uint skillIndex = 0;

        for(uint i = 0; i < users[_userAddress].skills.length;  i++) {
            skills[skillIndex] = users[_userAddress].skills[i];
            skillIndex++;
        }
        return skills;
    }

}