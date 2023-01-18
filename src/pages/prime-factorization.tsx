import { Container, Heading, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import CommonContainer from '../components/CommonContainer'
import CommonH2 from '../components/CommonH2'
import CommonH3 from '../components/CommonH3'
import Common from '../components/Nav'

function factor(n: number) {
  if (n > 100000000) {
    return ["too\\space large"];
  } else if (n < 2) {
    return ["too\\space small"];
  }

  // Efficient prime factorization
  var factors = [];
  var divisor = 2;

  while (n >= 2) {
    if (n % divisor === 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
}

const primeFactorization = () => {
  const [n, setN] = React.useState(2)

  const factors = factor(n);
  const expandedString = "\\(" + factors.join(" \\times ") + "\\)"
  const exponent = factors.reduce((acc, cur) => {
    if (acc[cur] === undefined) {
      acc[cur] = 1;
    } else {
      acc[cur]++;
    }
    return acc;
  }, {});
  const exponentString = "\\(" + Object.keys(exponent).map((key) => {
    return `${key}^{${exponent[key]}}`
  }).join(" \\times ") + "\\)"


  return (

    <CommonContainer title="Prime Factorization">
      <Text>Find the prime factors of any number!</Text>
      <CommonH2>Input</CommonH2>
      <InputGroup>
        <InputLeftAddon children="Number" />
        <Input defaultValue={"2"} type="number" onChange={(e) => setN(parseInt(e.target.value))} value={n} />
      </InputGroup>
      <CommonH2>Output</CommonH2>
      <MathJaxContext>
        <CommonH3>Expanded form</CommonH3>
        <MathJax inline dynamic>{expandedString}</MathJax>
        <CommonH3>Exponents</CommonH3>
        <MathJax inline dynamic>{exponentString}</MathJax>
      </MathJaxContext>


    </CommonContainer>



  )
}

export default primeFactorization