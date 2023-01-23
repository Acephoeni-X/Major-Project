const getBalance = async (account) => {
  if (window.ethereum != undefined) {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [`${account}`, "latest"],
    });
    if (balance === "0x0") {
      return undefined;
    }
    const wei = parseInt(balance, 16);
    return wei / Math.pow(10, 18);
  }
};

export default getBalance;
