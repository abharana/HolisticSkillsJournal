// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0;

/* 
    Import Ownable from the OpenZeppelin Contracts library
*/
import "@openzeppelin/contracts/access/Ownable.sol";

/* 
    Import UserRegister for user details
*/
import "./UserRegister.sol";

/* 
    @title Is used to create a Skill Campaign
    @author ab64dev
    @dev Contract still under development.
*/
 contract SkillFunding is Ownable{

    /* 
        @title Store details for a skill campaign with Beneficiary details, 
        users count that beneficiary is willing to sponsor, number of users registred, ether amount, enrolled user details
    */
    struct Campaign {
        address payable beneficiary;
        // string campaignName;
        // bool isPublicCampaign;
        uint fundingGoal;
        uint numUsers;
        uint amount;
        mapping (uint => UserRegister.User) enrolledUsers;
    }

    /* 
        campaign identifier
    */
    uint public numCampaigns;

    /* 
        list of all campaigns (public and private)
    */
    mapping (uint => Campaign) public campaigns;

    /* 
        Create event to indicate Fallback has been triggered
    */
    event FallbackTriggered(uint indexed date, address indexed sender, uint value);

    /* 
        @notice Beneficiary to create a new campaign
        @param Beneficiary address
        @param number of users who will be part of the campaign
        @return campaign identifier
    */
    function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
        campaignID = numCampaigns++; // campaignID is return variable
        // Creates new struct and saves in storage. We leave out the mapping type.
        campaigns[campaignID] = Campaign(beneficiary, goal, 0, 0);
    }

    /* 
        fallback implementation for errored transactions
    */
    fallback() external payable {
        emit FallbackTriggered(now, msg.sender, msg.value);
    }

    /* 
        @notice Contribute ether to the campaign
        @param capmpaign identifier
    */
    function contribute(uint campaignID) public payable {
        Campaign storage c = campaigns[campaignID];
        c.amount += msg.value;
    }

    /* 
        @notice Check if enough users have registered with the campaign and if enough funding is available
        @param capmpaign identifier
        @return status of campaign
    */
    function checkGoalReached(uint campaignID) public returns (bool reached) {
        Campaign storage c = campaigns[campaignID];
        if (c.amount < c.fundingGoal)
            return false;
        uint amount = c.amount;
        c.amount = 0;
        c.beneficiary.transfer(amount);
        return true;
    }

 }