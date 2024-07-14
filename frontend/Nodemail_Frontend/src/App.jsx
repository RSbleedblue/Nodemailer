
import reactLogo from './assets/react.svg'
import axios from 'axios';
import './App.css'
import { useState } from 'react'

function App() {
  const [email,setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = {name,email,password};
    const res = await axios.post("http://localhost:4500/api/register",data);
    console.log(res.data);
    if(res.data.success){
      alert("User Succesfully created!");
    }
    else{
      alert("User already Created");
    }
    console.log(data);
  }
  return (
    <>
      <div>
        <form className='form-container' onSubmit={handleSubmit}>
          <input value={name} placeholder='name' className='form' onChange={(e) => setName(e.target.value)} required></input>
          <input value={email} placeholder='email' className='form' onChange={(e) => setEmail(e.target.value)} type='email' required></input>
          <input value={password} placeholder='password' className='form' onChange={(e) => setPassword(e.target.value)} type='password' required></input>
          <button type='submit'>Submit</button>
        </form>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
