const getAccountAdd = async () => {
  const accounts = await window.ethereum
    .request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    })
    .then(() => window.ethereum.request({ method: "eth_requestAccounts" }));

  return accounts[0];
};

export default getAccountAdd;
