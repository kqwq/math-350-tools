import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Icon, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const NavSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = React.useRef()

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
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

  )
}

export default NavSidebar