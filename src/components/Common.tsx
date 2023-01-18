import {
  Box,
} from '@chakra-ui/react'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { DarkModeSwitch } from './DarkModeSwitch'
const Common = () => (
  <>
    <Header />
    <DarkModeSwitch />
    <Sidebar />
  </>

)

export default Common
