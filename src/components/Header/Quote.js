import { quotes } from "../store/quotes";

const randomGenerator = () => {
  const rndInt = Math.floor(Math.random() * 51);

  return rndInt;
};

const quote = quotes[randomGenerator()];

const Quote = () => {
  return (
    <div className="quote">
      <h2>{quote.q}</h2>
      <p>{"~ " + quote.a}</p>
    </div>
  );
};

export default Quote;
