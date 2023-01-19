import { InputGroup, Input, InputLeftAddon, Text, Wrap, Button, InputAddon } from '@chakra-ui/react'
import React from 'react'
import CommonContainer from '../components/CommonContainer'
import CommonH2 from '../components/CommonH2'

function findBezoutCoefficients(a: number, b: number) {
  if (b === 0) return [1, 0];
  let [s, t] = findBezoutCoefficients(b, a % b);
  return [t, s - Math.floor(a / b) * t];
}

function applyChineseRemainderTheorem(aList: number[], mList: number[]) {

  // m = m1 * m2 * ...

  // M1 = m / m1
  // M2 = m / m2
  // ...

  // y1 = (solve for bezout coef. for a1 * y1 congru. m1)
  // ...

  // x congru. a1 * M1 * y1 + a2 * M2 * y2 + ...



  return {
    latexSteps: [],
    latexResult: "aaa"
  }

}

const ChineseRemainderTheorem = () => {
  const [aList, setAList] = React.useState([2, 3, 2])
  const [mList, setMList] = React.useState([3, 5, 7])

  const { latexSteps, latexResult } = applyChineseRemainderTheorem(aList, mList)

  return (
    <CommonContainer title="Chinese Remainder Theorem" latexSteps={latexSteps} latexResult={latexResult}>

      <Text>Find the prime factors of any number less than a billion!</Text>
      <CommonH2>Input</CommonH2>

      <Wrap spacing="24px" shouldWrapChildren mt={4}>
        {
          aList.map((a, index) => (

            <InputGroup key={index}>
              <InputLeftAddon children={"x ≡ "} />
              <Input w="100px" defaultValue={mList[index]} placeholder={
                `m${index + 1}`
              } type="number" onChange={(e) => {
                const newList = [...mList]
                newList[index] = parseInt(e.target.value)
                setMList(newList)
              }
              } value={mList[index]} />


              <InputAddon ml="12px" children={`%`} />
              <Input w="100px" defaultValue={a} placeholder={
                `a${index + 1}`
              } type="number" onChange={(e) => {
                const newList = [...aList]
                newList[index] = parseInt(e.target.value)
                setAList(newList)
              }
              } value={a} />
            </InputGroup>
          ))

        }


      </Wrap>
      <Wrap mt={4}>
        {/* Add/remove button */}
        <Button onClick={() => {
          setAList([...aList, NaN]) // Push blank value to list
          setMList([...mList, NaN]) // Push blank value to list
        }}>Add</Button>
        <Button onClick={() => {
          setAList(aList.slice(0, -1))
          setMList(mList.slice(0, -1))
        }}>Remove</Button>
      </Wrap>

    </CommonContainer>
  )
}

export default ChineseRemainderTheorem