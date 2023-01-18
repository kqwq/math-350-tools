import { Heading } from '@chakra-ui/react'
import React from 'react'

const CommonH2 = ({ children }) => {
  return (
    <Heading as="h2" size="md" my={4}>{
      children
    }</Heading>
  )
}

export default CommonH2