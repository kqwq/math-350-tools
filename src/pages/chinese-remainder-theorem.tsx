import { InputGroup, Input, InputLeftAddon, Text, Wrap, Button, InputAddon } from '@chakra-ui/react'
import React from 'react'
import CommonContainer from '../components/CommonContainer'
import CommonH2 from '../components/CommonH2'

function findBezoutCoefficients(a: number, b: number) {
  let x = 0, y = 1, u = 1, v = 0;
  while (a !== 0) {
    let q = Math.floor(b / a), r = b % a;
    let m = x - u * q, n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  return [x, y];
}


function applyChineseRemainderTheorem(aList: number[], mList: number[]) {

  let isError = false;
  let steps = [];
  let txt = ""
  for (let i = 0; i < aList.length; i++) {
    if (mList[i] <= 1) {
      steps.push(`m${i + 1} must be greater than 1.`)
      isError = true;
    } else if (Number.isInteger(mList[i]) === false || Number.isInteger(aList[i]) === false) {
      steps.push(`m${i + 1} and a${i + 1} must be integers.`)
      isError = true;
    }
  }
  if (isError) {
    return {
      latexSteps: steps,
      latexResult: "",
      isError: isError
    }
  }

  let m = mList.reduce((a, b) => a * b, 1); // Product of all m's
  let mTxt = mList.map((_, i) => `m_{${i + 1}}`).join(" \\cdot ")
  let mValues = mList.map((_, i) => mList[i]).join(" \\cdot ")
  console.log(mTxt);


  // m = m1 * m2 * ...
  txt = `\\(m = ${mTxt} = ${mValues} = ${m}\\)`
  steps.push(txt)

  // M1 = m / m1
  // M2 = m / m2
  // ...
  let MList = mList.map((_, i) => {
    let M = m / mList[i];
    let MTxt = `M_{${i + 1}}`
    let MValues = `\\frac{${m}}{${mList[i]}}`
    txt = `\\(${MTxt} = \\frac{m}{m_{${i + 1}}} = ${MValues} = ${M}\\)`
    steps.push(txt)
    return M;
  })


  // y1 = (solve for bezout coef. for a1 * y1 congru. m1)
  // ...
  txt = `To solve for \\(y_k\\) : \\(M_k \\cdot y_k \\equiv 1 \\pmod{m_k}\\) `;
  steps.push(txt)
  let yList = [];
  for (let i = 0; i < mList.length; i++) {
    let sub = i + 1;
    // Show setup
    txt = `\\(${MList[i]} \\cdot y_{${sub}} \\equiv 1 \\pmod{${mList[i]}}\\)`


    let [y, x] = findBezoutCoefficients(MList[i], mList[i])
    console.log(y, x)
    let yValue = (y + mList[i]) % mList[i]
    yList.push(yValue)

    // Right arrow y_{sub} = yValue
    txt += ` \\( \\rightarrow y_{${sub}} = ${yValue}\\)`
    steps.push(txt)
  }

  // x congru. a1 * M1 * y1 + a2 * M2 * y2 + ...
  let innerTxt = aList.map((_, i) => {
    let sub = i + 1;
    return `a_{${sub}} M_{${sub}} y_{${sub}}`
  }).join(" + ")
  txt = `\\(x \\equiv ${innerTxt} \\pmod{m}\\)`
  steps.push(txt)

  // Now replace the values
  let total = 0;
  let innerValues = aList.map((_, i) => {
    let sub = i + 1;
    total += aList[i] * MList[i] * yList[i]
    return `${aList[i]} \\cdot ${MList[i]} \\cdot ${yList[i]}`
  }).join(" + ")
  txt = `\\(x \\equiv ${innerValues} \\pmod{${m}}\\)`
  steps.push(txt)
  txt = `\\(x \\equiv ${total} \\pmod{${m}} = ${total % m}\\)`
  steps.push(txt)



  return {
    latexSteps: steps,
    latexResult: (total % m).toString(),
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
              <Input w="100px" defaultValue={aList[index]} placeholder={
                `m${index + 1} `
              } type="number" onChange={(e) => {
                const newList = [...aList]
                newList[index] = parseInt(e.target.value)
                setAList(newList)
              }
              } value={aList[index]} />


              <InputAddon ml="12px" children={`% `} />
              <Input w="100px" defaultValue={mList[index]} placeholder={
                `a${index + 1} `
              } type="number" onChange={(e) => {
                const newList = [...mList]
                newList[index] = parseInt(e.target.value)
                setMList(newList)
              }
              } value={mList[index]} />
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