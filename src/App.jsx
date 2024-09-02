import { useEffect } from "react";
import { useCallback, useState, useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789';
    if(charAllowed) str += '~!@#$%^&*()?:}|{';
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass);



  },[length, numberAllowed, charAllowed, setPassword])

  const passwordRef = useRef(null)

  const copyTextToClipBoard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
    
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])


  return(
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white font-bold text-center my-6">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} placeholder="Password" ref={passwordRef} className="outline-none w-full py-1 px-3" />
        <button onClick={copyTextToClipBoard} className="outline-none text-white bg-blue-600 px-3 py-0.5 shrink-0">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className="cursor-pointer" 
          onChange={(e) => (setLength(e.target.value))}/>
          <label >Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          checked={numberAllowed}
          onChange={() => setNumberAllowed(!numberAllowed)}
          className="cursor-pointer"/>
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          checked={charAllowed}
          onChange={() => setCharAllowed(!charAllowed)}
          className="cursor-pointer"/>
          <label >Characters</label>
        </div>


      </div>
    </div>
    </>
  )
}

export default App
