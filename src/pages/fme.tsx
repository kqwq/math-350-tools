import { Input, Box, Flex, InputGroup, Heading, InputLeftAddon, Stack, HStack, Container, Text, Wrap } from '@chakra-ui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useState } from 'react'
import Common from '../components/Common'

const generateLatex = (b: number, n: number, m: number) => {
  let latexResult = `\\(= ${b}^${n} \\bmod ${m} = ${Math.pow(b, n) % m}\\)`

  // Format: 

  return {
    latexSteps,
    latexResult
  }

}



const exp = () => {
  const [b, setB] = useState<number>(0)
  const [n, setN] = useState<number>(0)
  const [m, setM] = useState<number>(0)
  const { latexSteps, latexResult } = generateLatex(b, n, m)


  //`\\(\\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}\\)`
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
        <Wrap spacing={2} shouldWrapChildren={true} direction="row">
          <InputGroup>
            <InputLeftAddon children="Base (b)" />
            <Input placeholder="Integer" width="150px" onChange={(e) => setB(parseInt(e.target.value))} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Exponent (n)" />
            <Input placeholder="Integer" width="150px" onChange={(e) => setN(parseInt(e.target.value))} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Modulo (m)" />
            <Input placeholder="Integer" width="150px" onChange={(e) => setM(parseInt(e.target.value))} />
          </InputGroup>
        </Wrap>
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Output
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit quaerat error quas, dicta ipsam rerum unde amet laboriosam autem. Ab laudantium earum sequi exercitationem, eaque repellat totam molestiae labore omnis.


          </Text>
          <MathJaxContext>
            <h2>Result</h2>
            <MathJax dynamic inline>{latexResult}</MathJax>


            <h2>Steps</h2>
            <MathJax dynamic>{latexSteps}</MathJax>
          </MathJaxContext>
        </Box>
      </Container>
    </>
  )
}

export default exp