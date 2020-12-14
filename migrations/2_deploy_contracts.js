const UserRegistry = artifacts.require("../contracts/UserRegister.sol");
const SkillEvaluation = artifacts.require("../contracts/SkillEvaluation.sol");

module.exports = async function(deployer) {
	await deployer.deploy(UserRegistry).then(userRegistry => deployer.deploy(SkillEvaluation, userRegistry.address));
};