import {
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Flex,
  Spacer,
  Container,
} from '@chakra-ui/react'
import Link from 'next/link'
import Nav from '../components/Nav'
import { tools } from '../constants'



const Index = () => (
  <>
    <Nav />
    <Container >

      <Text mt="10%" fontSize="6xl">Welcome to Math 350 Tools!</Text>
      <Text fontSize="2xl">This is a collection of tools for Discrete math taught at Liberty University.</Text>

      <Text mt={10} fontSize="2xl" textAlign="center">Popular tools</Text>
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

    </Container>

  </>
)

export default Index
