import { useState } from "react";
import { userRequest } from "../../requestMethods";
import "./newUser.css";

export default function NewUser() {

  const [inputs, setInputs] = useState({})

  const createUser = async (users) => {
    try {

      const res = await userRequest.post("/auth/register", users)

      console.log(res.data)

    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {

    setInputs((prev) => {

      return{...prev, [e.target.name]: e.target.value}

    })    
  }
  const handleClick = (e) => {

    e.preventDefault()

    const users = {...inputs}

    createUser(users)
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="john" 
            onChange={handleChange}
            />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email" 
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="password" 
            onChange={handleChange}
            />
        </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
