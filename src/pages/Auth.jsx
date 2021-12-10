import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import {setUser} from "../store/user/userSlice";

const Auth = () => {
    let history = useHistory()
    const dispatch = useDispatch();
      const [curUser, setCuruser] = useState({
          login: "",
          password: ""
      })
    const onchange = event => {
        setCuruser({
          ...curUser,
          [event.target.name]: event.target.value
      })
    }
    const login = async () => {
      try {
          const {data} = await axios.post('login',curUser)
          const u1 = data.data
          const type = u1.user_type

          dispatch(setUser({
              id: u1.id,
              type,
              bus_name: u1.bus_name ? u1.bus_name : "null"
          }))
          if(type === "operator") {
              history.push(`/op-bs/${u1.bus_id}/${u1.id}`)
          } else if (type === "superadmin") {
              history.push(`/destination`)
          } else {
              history.push(`/`)
          }
          window.location.reload()
      } catch (err) {
          alert(err)
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
