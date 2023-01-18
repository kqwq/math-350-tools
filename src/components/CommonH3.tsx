import { Heading } from '@chakra-ui/react'
import React from 'react'

const CommonH3 = ({ children }) => {
  return (
    <Heading as="h3" size="sm" my={4}>{
      children
    }</Heading>
  )
}

export default CommonH3