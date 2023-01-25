export default async function getTransHistory(req, res) {
  if (req.method == "POST") {
    let { address } = JSON.parse(req.body);
    let data = await (
      await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API}`
      )
    ).json();
    res.status(200).json({ data: data["result"].reverse() });
  } else {
    res.send(400);
  }
}
