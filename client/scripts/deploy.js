
import hre from "hardhat";
import fs from "fs"



const main = async() =>{
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", deployer.address);
  const balance = await deployer.getBalance();
  console.log("account balance ", balance);


  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplaceContract = await Marketplace.deploy();

 await marketplaceContract.deployed();
  console.log("Contract deployed at: ", marketplaceContract.address);


const data = {
  address: marketplaceContract.address,
  abi: JSON.parse(marketplaceContract.interface.format('json'))
}

//This writes the ABI and address to the mktplace.json
fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
}



const runMain = async () => {   
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();