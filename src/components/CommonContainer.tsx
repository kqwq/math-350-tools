import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Nav'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import CommonH2 from './CommonH2'
import CommonH3 from './CommonH3'


const CommonContainer = ({
  title = "no title",
  latexSteps = [],
  latexResult = "",
  children
}) => {
  return (
    <>

      <Navbar />
      {/* 3 inputs for b, n, and m. Each with a label and a description, width = 150px. */}
      <Container mt={4}>

        <Heading as="h3" size="xl" my={8} fontFamily="monospace">
          {title}
        </Heading>
        {children}

        {(latexSteps.length || latexResult) && <Box mt={8}>
          <CommonH2>Output</CommonH2>
          <MathJaxContext>
            {
              latexResult && <>
                <CommonH3>Result</CommonH3>
                <MathJax dynamic inline>{latexResult}</MathJax></>
            }
            {
              latexSteps.length && <> <CommonH3>Steps</CommonH3>
                <VStack spacing={2} align="start">
                  {
                    latexSteps.map((step, index) => {
                      return (
                        <MathJax dynamic inline key={index}>{step}</MathJax>
                      )
                    })

                  }
                </VStack></>
            }
          </MathJaxContext></Box>
        }
      </Container>
    </>
  )
}

export default CommonContainer