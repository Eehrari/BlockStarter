var Migrations = artifacts.require("Migrations");
var Project = artifacts.require("Project");
var ShareToken = artifacts.require("ShareToken");

// Note: Never use truffle migrate because I setuped the docker Migrations
// If you use truffle migrate docker migrations will conflict with truffle migrations


// Six parameters for Project constructor in order to Migrate
var title = "Test Project";
var description  = "it is only a test";
var fundingGoal = 300;
var availableTokens = 200;
var tokenAdress = 0x78885a59641286e4920282c2E542F6e033508F89;
var campaignDuration = 400;
// // Four parameters for ShareToken constructor in order to Migrate
var initialSupply = 140;
var tokenName = "Test";
var decimalUnits = 50;
var tokenSymbol = "T";

module.exports = function(deployer) {
    deployer.deploy(Migrations);

    //constructor,arg1,arg2,....argn
    deployer.deploy(Project,title,description,fundingGoal,availableTokens,tokenAdress,campaignDuration).then(function(instance) {
      // deployer.deploy(Project).then(function(instance) {
        console.log(instance);
    });

    //constructor,arg1,arg2,....argn
    deployer.deploy(ShareToken,initialSupply,tokenName,decimalUnits,tokenSymbol).then(function(instance) {
      // deployer.deploy(ShareToken).then(function(instance) {
        console.log(instance);
    });

};
