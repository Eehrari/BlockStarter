var ShareToken = artifacts.require("./ShareToken.sol");

contract("ShareToken",function(accounts){
  var shareTokenInstance;
  it("It initalizes a share token with the correct values",function (){
    return ShareToken.deployed().then(function(instance) {
      shareTokenInstance = instance;
      return shareTokenInstance.setParams(140,"Test",50,"T").then(function(i){
        return shareTokenInstance.getInfo().then(function(instance){
          infoInstance=instance;
          assert.equal(infoInstance[0], 140, "ShareToken did not get a correct initialSupply");
          assert.equal(infoInstance[1], "Test", "ShareToken did not get a correct name");
          assert.equal(infoInstance[2], 50, "ShareToken did not get a correct decimal units");
          assert.equal(infoInstance[3], "T", "ShareToken did not get a correct symbol");
        });
      });
    });
  });


  it("It returns the correct balance of creator", function (){
      return shareTokenInstance.tokenLeft().then(function(instance){
         creatorBalance=instance;
         assert.equal(creatorBalance, 140, "creator balance is incorrect");
    });
  });


  it("should accept transfering money to the address", async () => {
      return shareTokenInstance.transfer(0x85ca440fd7aE13b14E265C31064e31067d717e82,10).then(function(instance){
        return shareTokenInstance.tokenLeft().then(function(instance){
          creatorBalance=instance;
          assert.equal(creatorBalance, 130, "transfering money to the address rejected");
        });
     });
  });


  it("reciver address should be updated", async () => {
       return shareTokenInstance.reciverBalance(0x85ca440fd7aE13b14E265C31064e31067d717e82).then(function(instance){
            toBalance=instance;
            assert.equal(toBalance, 10, "the address balance did not update");
     });
  });


  it("initial supply and creator balance shares the same value", async () => {
     return shareTokenInstance.showShares().then(function(instance){
          showSharesStatus=instance;
          assert.equal(showSharesStatus[0], 130, "intial supply not met the goal");
          assert.equal(showSharesStatus[0], 130, "creator balance not met the goal");
      });
   });
});
