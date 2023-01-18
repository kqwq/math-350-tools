import {
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import Link from 'next/link'
import Common from '../components/Common'
import { tools } from '../constants'



const Index = () => (
  <>
    <Common />
    <Flex direction="column" align="center" justify="center" h="100vh">

      <Text fontSize="6xl">Welcome to Math 350 Tools!</Text>
      <Text fontSize="2xl">This is a collection of tools for Discrete math taught at Liberty University.</Text>

      <Text mt={10} fontSize="2xl">Popular tools</Text>
      <List spacing={3} mt={5}>
        {
          tools.filter(
            tool => tool.showOnHome
          ).map((tool, index) => (

            <ListItem key={index}>
              <Link href={tool.link}>
                <Text fontSize="xl" color="teal.600" fontWeight="bold">{tool.name}</Text>
                <Text fontSize="md">{tool.description}</Text>
              </Link>
            </ListItem>
          ))

        }
      </List>

    </Flex>

  </>
)

export default Index
