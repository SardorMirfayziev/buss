import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"

const Auth = () => {
    let history = useHistory()
  const [user, setUser] = useState({
      login: "",
      password: ""
  })
    const onchange = event => {
      setUser({
          ...user,
          [event.target.name]: event.target.value
      })
    }
    const login = async () => {
      const {data} = await axios.post('login',user)
        console.log(data.data)
        localStorage.removeItem('userType')
        localStorage.setItem('userType',JSON.stringify(data.data.user_type))
      if(data.data.user_type === "operator") {
          history.push(`/op-bs/${data.data.bus_id}/${data.data.id}`)
      } else if (data.data.user_type === "superadmin") {
          history.push(`/destination`)
      }
    }
  return (
      <div className="auth">
          <h2>Log in</h2>

          <div className="tabContent">
              <input type="text" placeholder="Email" name="login" onChange={onchange}/>
              <input type="password" placeholder="Password" name="password" onChange={onchange}/>
          </div>
          <button className="m-a" onClick={login}>Login</button>

      </div>
  );
};

export default Auth;
