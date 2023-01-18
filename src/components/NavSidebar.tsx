import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Icon, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { tools } from '../constants'

const Love = () => {
  // When the user hovers, display the heart emoji, otherwise display &lt;3
  const love = React.useRef(null)
  return (
    <Box
      ref={love}
      as="span"
      onMouseEnter={() => (love.current.innerText = '❤️')}
      onMouseLeave={() => (love.current.innerText = '<3')}
    >&lt;3
    </Box >
  )
}

const NavSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = React.useRef()
  const [searchText, setSearchText] = React.useState('')

  const filteredTools = tools.filter(tool => {
    return tool.name.toLowerCase().includes(searchText.toLowerCase())
  })


  return (
    <>
      {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button> */}
      {/* Hamburger icon fixed to the top left */}
      <Icon as={HamburgerIcon} w={9} h={9} onClick={onOpen}
        position="absolute" top={2.5} left={4}
        color="white"
        _hover={{
          color: 'gray.300',
          cursor: 'pointer'
        }}
      />

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search tools</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' onChange={(e) => setSearchText(e.target.value)} />
            <VStack spacing={4} align='stretch' mt={4}>
              {
                // Blue links for tools that match the search text
                filteredTools.map(tool => (
                  <Link key={tool.name} href={tool?.link || ""}>
                    <Button
                      width='100%'
                      colorScheme='teal'
                      variant={"link"}
                      // rightIcon={<ExternalLinkIcon />}
                      onClick={onClose}
                    >
                      {tool.name}
                    </Button>
                  </Link>
                ))
              }
              {
                filteredTools.length === 0 &&
                <Box>No tools found</Box>
              }
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            Made with&nbsp;<Love />&nbsp;by&nbsp;<Link
              style={{
                color: 'blue',
                textDecoration: 'underline',
              }}
              href='https://www.linkedin.com/in/kqwq/'>Kyle Wells</Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

  )
}

export default NavSidebar