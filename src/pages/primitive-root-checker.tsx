import { Wrap, InputGroup, Input, InputLeftAddon, Text } from '@chakra-ui/react'
import React from 'react'
import CommonContainer from '../components/CommonContainer'

function checkPrimitiveRoots(p, g) {
  let phi = p - 1
  let factors = []
  let n = phi
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      factors.push(i)
      while (n % i === 0) {
        n /= i
      }
    }
  }
  for (let i = 0; i < factors.length; i++) {
    if (Math.pow(g, phi / factors[i]) % p === 1) {
      return false
    }
  }
  return true
}

const PrimitiveRootChecker = () => {

  const [p, setP] = React.useState(0)
  const [g, setG] = React.useState(0)

  const result = checkPrimitiveRoots(p, g) ? 'Yes' : 'No'



  return (
    <CommonContainer title='Primitive Root Checker' latexResult={result}>

      <Text>Check if g is a primitive root modulo p</Text>

      <Wrap spacing="30px" shouldWrapChildren={true} justify="center">


        <InputGroup>
          <InputLeftAddon children="g" />
          <Input type="number" value={g} onChange={e => setG(parseInt(e.target.value))} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="p" />
          <Input type="number" value={p} onChange={e => setP(parseInt(e.target.value))} />
        </InputGroup>


      </Wrap>
    </CommonContainer>
  )
}

export default PrimitiveRootChecker