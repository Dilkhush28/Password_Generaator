
import { useCallback, useEffect, useState,useRef} from 'react'

function App() {
  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
//useRef hook
//4th
const passwordRef = useRef(null) 
 // 1st
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$€*"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 10)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed,setPassword])

  //3rd
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,35)
window.navigator.clipboard.writeText(password)
  },[password])

  //2nd
  useEffect(()=>{
    passwordgenerator()
  },[length,numberAllowed,charAllowed,passwordgenerator]) 
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-gray-500 text-center text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type=""
            value={password}
            className='otline-none w-full py-1 px-3'
            placeholder='password'
            min={6}
            max={50}
          
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.6 shrink-0'
          >copy</button>
        </div>
        <div className='text-white outline-none flex'>
          <div className='flex items-center text-sm gap-x-1'>
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className='cursor-pointe'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label>Number:{numberAllowed}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label>Character:{charAllowed}</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
