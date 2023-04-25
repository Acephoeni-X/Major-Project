const fetchPred = async () => {
  let data = await (await fetch("http://localhost:8080/predict")).json();
  return data;
};

export default fetchPred;
