import { Box, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { DarkModeSwitch } from './DarkModeSwitch'

const Header = () => {
  const { colorMode } = useColorMode()

  return (
    <Box
      as="header"
      height="60px"
      width="100%"
      bg={
        colorMode === 'dark' ? 'teal.900' : 'gray.800'
      }
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box

        as="h1"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"

      >
        <Link href="/">
          Math 350 Tools
        </Link>
      </Box>

      <DarkModeSwitch />
    </Box>
  )
}

export default Header