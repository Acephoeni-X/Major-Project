// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method == "POST") {
    let { balance } = req.query;
    let data = await (
      await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR"
      )
    ).json();
    balance = parseFloat(balance);
    let inr = parseFloat(data.INR);
    // let ok = JSON.stringify(req);
    console.log(balance);
    // res.status(200).json({ price: ok });

    res.status(200).json({ price: balance * inr });
  } else {
    res.send(400);
  }
}
