import { Checkbox, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Switch, Text, VStack, Wrap } from '@chakra-ui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import CommonContainer from '../components/CommonContainer'
import CommonH2 from '../components/CommonH2'
import CommonH3 from '../components/CommonH3'
import { generateEuclideanAlgorithm } from './euclidean-algorithm'


function placeMinusSignsInNicePositions(gcd: number, leftTerm1: number, leftTerm2: number, rightTerm1: number, rightTerm2: number, fourthTermOverride: any = false) {
  if (leftTerm2 < 0) {
    leftTerm1 = -leftTerm1;
    leftTerm2 = -leftTerm2;
  }
  if (rightTerm2 < 0) {
    rightTerm1 = -rightTerm1;
    rightTerm2 = -rightTerm2;
    // if (thirdTermOverride) thirdTermOverride = "-" + thirdTermOverride;
  }
  let middleSign = rightTerm1 < 0 ? "" : "+";
  return `
  \\(${gcd} = ${leftTerm1} \\cdot ${leftTerm2} ${middleSign} ${rightTerm1} \\cdot ${fourthTermOverride || rightTerm2}\\)
  `
}

function generateExtendedEuclideanAlgorithm(a: number, b: number, basicEuclidean: any) {
  if (basicEuclidean.isError) {
    return {
      latexSteps: [],
      latexResult: ""
    }
  }
  let steps = [];

  // Work backwards to find the Bezout coefficients
  let rList = basicEuclidean.rList;
  let qList = basicEuclidean.qList;

  console.log(qList, rList)

  let theGcd = rList[rList.length - 2]
  let s = 1;
  let t = -qList[qList.length - 2];
  for (let i = qList.length - 1; i >= 1; i--) {
    let r1 = rList[i];
    let r2 = rList[i - 1];
    let r3 = rList[i - 2];
    let q3 = qList[i - 2];

    // 10 = 70 * 3 * 20


    let txt = `
    \\(${theGcd} = ${r2} \\cdot ${s} + ${r1} \\cdot ${t}\\)`
    // steps.push(txt);

    steps.push(placeMinusSignsInNicePositions(theGcd, s, r2, t, r1))

    // Replace r1 with (r3 - q1 * r2)
    if (i === 1) {
      break;
    }
    // txt = `
    // \\(${theGcd} = ${r2} \\cdot ${s} + (${r3} - ${r2} \\cdot ${q3}) \\cdot ${t}\\)`


    // steps.push(txt);
    steps.push(placeMinusSignsInNicePositions(theGcd, s, r2, t, (r3 - r2 * q3), `(${r3} - ${q3} \\cdot ${r2})`))

    // Simplify
    let sWas = s;
    s = t;
    t = sWas - t * q3;

  }

  if (b > a) {
    // Swap order so that a*s + b*t = gcd(a, b)
    let temp = s;
    s = t;
    t = temp;
  }

  return {
    latexSteps: steps,
    latexResult: "\\(\\text{Bézout coefficients: } s = " + s + ",\\space t = " + t + "\\)"
  }
}

const ExtendedEuclideanAlgorithm = () => {
  const [a, setA] = React.useState(0)
  const [b, setB] = React.useState(0)
  const basicEuclidean = generateEuclideanAlgorithm(a, b)
  const extendedEuclidean = generateExtendedEuclideanAlgorithm(a, b, basicEuclidean)

  return (
    <CommonContainer title="Extended Euclidean Algorithm">
      <Text>Find the Bezout coefficients!</Text>
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

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="show-steps" mb="0">Show table</FormLabel>
          <Switch id="show-steps" size='lg' colorScheme="teal" />

        </FormControl>


      </Wrap>

      <CommonH2>Output</CommonH2>
      <MathJaxContext>
        <CommonH3>Result</CommonH3>
        <MathJax dynamic inline>{extendedEuclidean.latexResult}</MathJax>

        <CommonH3>Steps for Euclidean Algorithm</CommonH3>


        <VStack spacing={2} align="start">
          {
            basicEuclidean.latexSteps.map((step, index) => {
              return (
                <MathJax dynamic inline key={index}>{step}</MathJax>
              )
            })

          }
        </VStack>

        <CommonH3>Working Backgrounds to Find Bézout Coefficients</CommonH3>

        <VStack spacing={2} align="start">
          {
            extendedEuclidean.latexSteps.map((step, index) => {
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

export default ExtendedEuclideanAlgorithm