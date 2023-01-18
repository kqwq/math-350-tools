import {
  Box,
} from '@chakra-ui/react'

import NavBackground from './NavBackground'
import NavSidebar from './NavSidebar'
import { DarkModeSwitch } from './DarkModeSwitch'
const Nav = () => (
  <>
    <NavBackground />
    <DarkModeSwitch />
    <NavSidebar />
  </>

)

export default Nav
