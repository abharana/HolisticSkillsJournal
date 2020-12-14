let BN = web3.utils.BN
let UserRegister = artifacts.require('UserRegister')
let SkillEvaluation = artifacts.require('SkillEvaluation')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('UserRegister', function(accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const charles = accounts[3]
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    let userRegistryInstance

    beforeEach(async () => {
        userRegistryInstance = await UserRegister.new()
    })

    it("should register account with additional details", async() => {
        const tx = await userRegistryInstance.registerUserAccount(owner, "ab64dev", {from: owner})
                
        const result = await userRegistryInstance.getUser.call(owner)

        assert.equal(result[0], "ab64dev", 'the name of user account does not match the expected value')
        assert.equal(result[1], true, 'the account has been registered successfully')
    })

    it("should emit a userRegistered event when a user has been registred", async()=> {
        let eventEmitted = false
        const tx = await userRegistryInstance.registerUserAccount(owner, "ab64dev", {from: owner})
        
        if (tx.logs[0].event == "userRegistered") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'registering an user should emit a user Registered event')
    })

    it("owner should be able to pause a contract", async()=> {
        const tx = await userRegistryInstance.pauseContract({from: owner})
                
        const result = await userRegistryInstance.paused()

        assert.equal(result, true, 'contract has been paused successfully')
    })

    it("owner should be able to unpause a contract", async()=> {
        await userRegistryInstance.pauseContract({from: owner})
        await userRegistryInstance.unPauseContract({from: owner})
                
        const result = await userRegistryInstance.paused()

        assert.equal(result, false, 'contract has been paused successfully')
    })

    it("should revert if an address other than the owner calls pause Contract", async() => {
        await catchRevert(userRegistryInstance.pauseContract({from: alice}));
    });
    
    


})
