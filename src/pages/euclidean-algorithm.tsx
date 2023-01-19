import { Input, InputGroup, InputLeftAddon, Text, VStack, Wrap } from '@chakra-ui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import CommonContainer from '../components/CommonContainer'
import CommonH2 from '../components/CommonH2'
import CommonH3 from '../components/CommonH3'

const generateEuclideanAlgorithm = (a: number, b: number) => {
  let steps = [];
  let result = 0;
  let isError = false;
  if (a <= 0 || b <= 0) {
    steps.push(`a and b must be positive.`)
    isError = true;
  }
  if (Number.isInteger(a) === false || Number.isInteger(b) === false) {
    steps.push(`a and b must be integers.`)
    isError = true;
  }
  if (a > Number.MAX_SAFE_INTEGER || b > Number.MAX_SAFE_INTEGER) {
    steps.push(`a and b must be less than ${Number.MAX_SAFE_INTEGER}.`)
    isError = true;
  }
  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }
  if (isError) {
    return {
      latexSteps: steps,
      latexResult: "",
      isError: isError
    }
  }

  let r = a;
  let rList = [b, a];
  let qList = [];
  while (r !== 0) {
    let q = Math.floor(b / r);
    let rNew = b - q * r;
    qList.push(q);
    rList.push(rNew);
    steps.push(`\\(${b} = ${r} \\cdot ${q} + ${rNew}\\)`)
    b = r;
    r = rNew;
  }
  result = b;
  steps.push(`\\(\\text{gcd}(a, b) = ${result}\\)`)



  return {
    latexSteps: steps,
    latexResult: result,
    qList,
    rList,
    isError
  }
}

const EuclideanAlgorithm = () => {
  const [a, setA] = React.useState(0)
  const [b, setB] = React.useState(0)
  let {
    latexSteps,
    latexResult
  } = generateEuclideanAlgorithm(a, b)

  return (
    <CommonContainer title="Euclidean Algorithm">
      <Text>Find the greatest common divisor of two numbers using the Euclidean Algorithm.</Text>
      <CommonH2>Input</CommonH2>
      <Wrap spacing={2} shouldWrapChildren={true} direction="row">
        <InputGroup w="150px">
          <InputLeftAddon children="a" />
          <Input type="number" value={a} onChange={(e) => setA(parseInt(e.target.value))} />

        </InputGroup>
        <InputGroup w="150px">
          <InputLeftAddon children="b" />
          <Input type="number" value={b} onChange={(e) => setB(parseInt(e.target.value))} />
        </InputGroup>
      </Wrap>

      <CommonH2>Output</CommonH2>
      <MathJaxContext>
        <CommonH3>Result</CommonH3>
        <MathJax dynamic inline>{latexResult}</MathJax>

        <CommonH3>Steps</CommonH3>


        <VStack spacing={2} align="start">
          {
            latexSteps.map((step, index) => {
              return (
                <MathJax dynamic inline key={index}>{step}</MathJax>
              )
            })

          }
        </VStack>
      </MathJaxContext>


    </CommonContainer>
  )
}

export { generateEuclideanAlgorithm }
export default EuclideanAlgorithm