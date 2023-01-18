import { Container, Heading } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Nav'

const CommonContainer = ({
  title = "no title",
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
      </Container>
    </>
  )
}

export default CommonContainer