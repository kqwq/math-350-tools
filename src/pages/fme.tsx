import { Input, Box, Flex, InputGroup, Heading, InputLeftAddon, Stack, HStack, Container, Text, Wrap, Button, Spacer, VStack } from '@chakra-ui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useState } from 'react'
import Common from '../components/Common'

const generateLatex = (b: number, n: number, m: number) => {

  // Check domains
  let isError = false;
  var steps = [];
  if (b < 2) {
    steps.push(`b must be greater than 1.`)
    isError = true;
  }
  if (n < 0) {
    steps.push(`n must be nonnegative.`)
    isError = true;
  }
  if (m < 2) {
    steps.push(`m must be greater than 1.`)
    isError = true;
  }
  if (Number.isInteger(b) === false) {
    steps.push(`b must be an integer.`)
    isError = true;
  }
  if (Number.isInteger(n) === false) {
    steps.push(`n must be an integer.`)
    isError = true;
  }
  if (Number.isInteger(m) === false) {
    steps.push(`m must be an integer.`)
    isError = true;
  }
  if (isError) {
    return {
      latexSteps: steps,
      latexResult: ""
    }
  }



  // Steps
  var nBinary = n.toString(2); // convert n to binary
  var x = 1;
  var power = b % m;
  let txt;
  for (var i = nBinary.length - 1; i >= 0; i--) {
    var bit = nBinary[i];
    if (bit === "1") {
      var a = x;
      x = (x * power) % m;
      txt = `\\(i = ${nBinary.length - i}\\) : Because \\(a_{${nBinary.length - i}} = ${bit}\\), we have \\(x = ${a} \\times ${power} \\bmod ${m} = ${x}\\)`
      steps.push(txt)
    } else {
      // Same as above, but without updating x
      txt = `\\(i = ${nBinary.length - i}\\) : Because \\(a_{${nBinary.length - i}} = ${bit}\\), we have \\(x = ${x}\\)`
      steps.push(txt)
    }
    let powerBefore = power;
    power = (power * power) % m;
    txt = `\\(\\hspace{1cm} power = ${powerBefore}^2 \\bmod ${m} = ${power}\\).`

    steps.push(txt)

  }

  // Result
  let latexResult = `\\(= ${b}^ { ${n}
    } \\bmod ${m} = ${x} \\)`

  return {
    latexSteps: steps,
    latexResult
  }

}

const setId = (id: string, value: string) => {
  (document.getElementById(id) as HTMLInputElement).value = value
}

const exp = () => {
  const [b, setB] = useState<number>(0)
  const [n, setN] = useState<number>(0)
  const [m, setM] = useState<number>(0)
  const { latexSteps, latexResult } = generateLatex(b, n, m)


  //`\\(\\frac{ 1 } { \\sqrt{ 2\\pi\\sigma ^ 2 } } e ^ {-\\frac{ (x -\\mu)^ 2 } { 2\\sigma ^ 2 }

  return (
    <>

      <Common />
      {/* 3 inputs for b, n, and m. Each with a label and a description, width = 150px. */}
      <Container mt={4}>

        <Heading as="h3" size="xl" my={8} fontFamily="monospace">
          Fast Modular Exponentiation
        </Heading>
        <Heading size="md" mb={4}>
          Input
        </Heading>
        <Button mb={2} colorScheme={'teal'} size="sm" onClick={() => {
          setB(3)
          setN(2003)
          setM(99)
          setId("in-b", "3")
          setId("in-n", "2003")
          setId("in-m", "99")
        }}> Example</Button>

        <Wrap spacing={2} shouldWrapChildren={true} direction="row">

          <InputGroup>
            <InputLeftAddon children="Base (b)" />
            <Input id="in-b" placeholder="Integer" width="150px" onChange={(e) => setB(Number(e.target.value))} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Exponent (n)" />
            <Input id="in-n" placeholder="Integer" width="150px" onChange={(e) => setN(Number(e.target.value))} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Modulo (m)" />
            <Input id="in-m" placeholder="Integer" width="150px" onChange={(e) => setM(Number(e.target.value))} />
          </InputGroup>
        </Wrap>
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Output
          </Heading>
          <Text>

          </Text>
          <MathJaxContext>
            <Heading size="sm" mb={4}>Result</Heading>
            <MathJax dynamic inline>{latexResult}</MathJax>


            <Heading size="sm" my={4}>Steps</Heading>
            <VStack spacing={2} align="start">
              {

                latexSteps.map((step, index) => {
                  return (
                    <>
                      <MathJax dynamic inline key={index}>{step}</MathJax>
                    </>
                  )
                })
              }
            </VStack>
          </MathJaxContext>
        </Box>
      </Container>
    </>
  )
}

export default exp