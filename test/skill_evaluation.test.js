let BN = web3.utils.BN
let UserRegister = artifacts.require('UserRegister')
let SkillEvaluation = artifacts.require('SkillEvaluation')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('SkillEvaluation', function(accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const charles = accounts[3]
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    let userRegistryInstance
    let skillEvaluationInstance

    beforeEach(async () => {
        userRegistryInstance = await UserRegister.deployed();
        skillEvaluationInstance = await SkillEvaluation.new(userRegistryInstance.address);
    })

    it("should have already registerd alice, bob and charles account ", async() => {

        const tx1 = await userRegistryInstance.registerUserAccount(accounts[1], "alice");
        const tx2 = await userRegistryInstance.registerUserAccount(accounts[2], "bob");
        const tx3 = await userRegistryInstance.registerUserAccount(accounts[3], "charles");
              
        const result1 = await userRegistryInstance.getUser.call(alice)
        const result2 = await userRegistryInstance.getUser.call(bob)
        const result3 = await userRegistryInstance.getUser.call(charles)

        assert.equal(result1[0], "alice", 'the name of user account does not match the expected value')
        assert.equal(result1[1], true, 'the account has been registered successfully')
        assert.equal(result2[0], "bob", 'the name of user account does not match the expected value')
        assert.equal(result2[1], true, 'the account has been registered successfully')
        assert.equal(result3[0], "charles", 'the name of user account does not match the expected value')
        assert.equal(result3[1], true, 'the account has been registered successfully')
    })

    it("should create skill from alice account", async() => {
        const tx1 = await skillEvaluationInstance.createSkill("LEGO Skills", 0, {from: alice})

        const result = await skillEvaluationInstance.skill(0);

        assert.equal(result.skilledPerson, alice, 'skill created successfully for alice')
    })

    it("should emit a skill created event when skill is created", async() => {
        let eventEmitted = false
        const tx = await skillEvaluationInstance.createSkill("LEGO Skills", 0, {from: alice})

        if (tx.logs[0].event == "skillCreated") {
            eventEmitted = true
        }

       assert.equal(eventEmitted, true, 'should emit a skill created event')
    })

    it("should certify a skill for alice from bobs account", async() => {
        
        const tx1 = await skillEvaluationInstance.createSkill("LEGO Skills", 0, {from: alice})
        const tx2 = await skillEvaluationInstance.certifySkill(0, 4, 0, {from: bob})

        const result = await skillEvaluationInstance.skill(0);

        assert.equal(result.state, 2, 'bob has to certify skill for alice')
    })

    it("should not allow alice to certify her own skill", async() => {
        
        const tx1 = await skillEvaluationInstance.createSkill("LEGO Skills", 0, {from: alice})
        await catchRevert(skillEvaluationInstance.certifySkill(0, 4, 0, {from: alice}))
    })

    it("should certify a skill for alice from bob and charles account", async() => {
        
        const tx1 = await skillEvaluationInstance.createSkill("LEGO Skills", 0, {from: alice})
        const tx2 = await skillEvaluationInstance.certifySkill(0, 4, 0, {from: bob})
        const tx3 = await skillEvaluationInstance.certifySkill(0, 6, 0, {from: charles})

        const result = await skillEvaluationInstance.skill(0);

        assert.equal(result.state, 3, 'bob and charles have to certify skill for alice')
    })

    it("should get the list of skill issuers", async() => {
        
        const tx1 = await skillEvaluationInstance.createSkill("LEGO Skills", 0, {from: alice})
        const tx2 = await skillEvaluationInstance.certifySkill(0, 4, 0, {from: bob})
        const tx3 = await skillEvaluationInstance.certifySkill(0, 6, 0, {from: charles})

        const result = await skillEvaluationInstance.getSkillIssuers(0);

        assert.equal(result[0], bob, 'bob has approved skill for Alice')
        assert.equal(result[1], charles, 'charles has approved skill for Alice')
    })

})
