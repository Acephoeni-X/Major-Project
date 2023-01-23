import { ethers } from "ethers";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";

const sendTransaction = async (toAddress, amount) => {
  if (window.ethereum != undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(toAddress, Lock.abi, signer);

    const data = await contract.sendEther(toAddress, {
      value: ethers.utils.parseUnits(amount, "ether"),
    });
    return data;
  }
};

export default sendTransaction;
