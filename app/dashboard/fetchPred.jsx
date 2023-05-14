const fetchPred = async () => {
  let data = await (await fetch("http://localhost:3840/predict")).json();
  return data;
};

export default fetchPred;
