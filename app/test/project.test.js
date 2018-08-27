var Project = artifacts.require("./Project.sol");

contract("Project",function(accounts){
  var projectInstance;
  it("It initalizes a project with the correct values",function (){
    return Project.deployed().then(function(instance) {
      projectInstance = instance;
      return projectInstance.setParams("Test Project","it is only a test",100).then(function(i){
        return projectInstance.getInfo().then(function(p){
          project=p;
          assert.equal(project[0], "Test Project", "project did not get a correct title");
          assert.equal(project[1], "it is only a test", "project did not get a correct description");
          assert.equal(project[2], 100, "project did not get a correct founding goal");
        });
      });
    });
  });

  it("Should accept sending ether directly to the contract.", async () => {
    instance = await Project.deployed();
      return instance.sendTransaction(
        { from: accounts[0], value: 20 }
      ).then(function(i){
          return projectInstance.showStatus().then(function(p){
             projectStatus=p;
             assert.equal(projectStatus[1], 20, "sending ether rejected");
         });
     });
  });

  it("should return false when the goal is not reached", async () => {
      return projectInstance.showStatus().then(function(p){
         projectStatus=p;
         assert.equal(projectStatus[2], false, "goal not reached");
     });
  });

  it("the goal has been reached", async () => {
    instance = await Project.deployed();
    return  instance.sendTransaction(
        { from: accounts[0], value: 80 }
      ).then(function(i){
          return projectInstance.showStatus().then(function(p){
               projectStatus=p;
               assert.equal(projectStatus[0], 100, "founding goal not met");
               assert.equal(projectStatus[1], 100, "founding status not met");
               assert.equal(projectStatus[2], true, "goal not reached");
         });
      });
  });

  it("Should accept withdraw ether directly from the contract.", async () => {
     projectInstance.withdraw(60).then(function(p){
       return projectInstance.showStatus().then(function(p){
          projectStatus=p;
          assert.equal(projectStatus[1], 40, "Withdraw successed"+projectStatus[1]);
        });
     });
  });
});
