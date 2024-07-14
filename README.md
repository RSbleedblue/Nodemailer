# React Registration Form with Node.js Backend

This project demonstrates a simple user registration form using React for the frontend and Node.js for the backend. The form collects user information (name, email, and password) and sends it to a backend API for registration. The backend validates the user information, checks for duplicate email addresses, and saves the new user to the database if the email is not already registered. Additionally, a confirmation email is sent to the registered email address.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [License](#license)

## Installation

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo/backend
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongo_connection_string
   PORT=4500
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

3. Start the React application:
   ```sh
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port specified by your React app).
2. Fill in the registration form with your name, email, and password.
3. Submit the form to register the user.

## Backend

The backend is built using Node.js and Express. It includes a user controller to handle registration logic and a utility function to send confirmation emails.

### UserController

The `UserController` class handles user registration. It checks if the email is already registered, and if not, saves the new user to the database and sends a confirmation email.

```javascript
import UserModel from "../Models/UserModel.js";
import sendConfirmation from "../utils/sendConfirmationMail.js";

class UserController {
    constructor() {}

    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const data = { name, email, password };
            console.log(data);
            const checkUser = await UserModel.findOne({ email });
            if (checkUser) {
                return res.status(400).json({ message: "Email ID already registered, please use a different one", success: false });
            }
            const user = new UserModel(data);
            await user.save();
            await sendConfirmation(email, name);
            return res.status(201).json({ message: "User successfully created!", data: user, success: true });
        } catch (error) {
            res.status(500).json({ message: "User registration failed", success: false });
        }
    }
}

export default UserController;
```

## Frontend

The frontend is built using React. It includes a form to collect user information and sends a POST request to the backend API to register the user.

### App Component

The `App` component contains the registration form and handles form submission.

```javascript
import reactLogo from './assets/react.svg'
import axios from 'axios';
import './App.css'
import { useState } from 'react'

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    const res = await axios.post("http://localhost:4500/api/register", data);
    console.log(res.data);
    if (res.data.success) {
      alert("User Successfully created!");
    } else {
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
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute and raise issues. Happy coding!
