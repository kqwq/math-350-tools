import { Box, Flex, HStack, Image, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { DarkModeSwitch } from './DarkModeSwitch'

const NavBackground = () => {
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
      <HStack

        as="h1"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"

      >
        <Image src="/site-icon.png" alt="logo" width="22px" />

        <Link href="/">
          Math 350 Tools
        </Link>
      </HStack>

      <DarkModeSwitch />
    </Box>
  )
}

export default NavBackground