import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(9); // Use number instead of string
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioasdfghjkzxcvbnm";

    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*()?";

    for (let index = 0; index < length; index++) { // Start at 0
      let newPass = Math.floor(Math.random() * str.length); // No +1
      pass += str.charAt(newPass);
    }

    setPassword(pass);
  }, [length, num, char]);

  useEffect(() => {
    passGenerator();
  }, [length, num, char, passGenerator]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Password Generator</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Generated Password"
              value={password}
              readOnly
              className="border border-gray-300 rounded-lg w-full p-2 text-center"
            />
            <button className="mt-2 bg-blue-500 text-white rounded-lg w-full py-2 hover:bg-blue-600 transition">
              Copy
            </button>
          </div>

          <div className="flex items-center mb-4">
            <label className="mr-2">Length: {length}</label>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={num}
              onChange={() => setNum(prev => !prev)}
              className="mr-2"
            />
            <label>Include Numbers</label>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={char}
              onChange={() => setChar(prev => !prev)}
              className="mr-2"
            />
            <label>Include Special Characters</label>
          </div>

          <button
            onClick={passGenerator}
            className="bg-green-500 text-white rounded-lg w-full py-2 hover:bg-green-600 transition"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
