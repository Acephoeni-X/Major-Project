// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let { balance } = req.query;
  // console.log(balance);
  let data = await (
    await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR"
    )
  ).json();
  balance = parseFloat(balance);
  let inr = parseFloat(data.INR);

  res.status(200).json({ price: balance * inr });
}
