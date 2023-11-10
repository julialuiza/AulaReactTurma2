import { useState } from "react";

interface PropsCalculadora {
  op: string;
}

export default function Calculadora(props: PropsCalculadora) {
  const [n1, SetN1] = useState(0);
  const [n2, SetN2] = useState(0);
  const [result, SetResult] = useState(0);

  function FazOperacao() {
    switch (props.op) {
      case "+":
        SetResult(n1 + n2);
        break;
      case "-":
        SetResult(n1 - n2);
        break;
      case "*":
        SetResult(n1 * n2);
        break;
      case "/":
        SetResult(n1 / n2);
        break;
    }

    console.log(result);
  }

  return (
    <div>
      <input
        placeholder="Number 1"
        onChange={(e) => SetN1(parseInt(e.target.value))}
      />
      {props.op}
      <input
        placeholder="Number 2"
        onChange={(e) => SetN2(parseInt(e.target.value))}
      />
      <label>{result}</label>
      <button onClick={() => FazOperacao()}>Faz Operacao</button>
    </div>
  );
}
