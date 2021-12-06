import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const options = [
    {
        name: "Apple",
        id: "apple",
    },
    {
        name: "Apple",
        id: "apple",
    },
    {
        name: "Apple",
        id: "apple",
    }

];

const Operators = () => {
    const [dests,setDests] = useState([])
    const [buses,setBuses] = useState(options)
    const [curD,setCurD] = useState({
        alias: "operator",
        bus_id: "",
        login: "",
        name: "",
        password: ""
    })
    const [crOpen,setCrOpen] = useState(true)
    const changeCurD = (event) => {
        setCurD({
            ...curD,
            [event.target.name]: event.target.value
        })
        console.log(curD)
    }
    const createDest = async () => {
        await axios.post('user', {
            ...curD,
            bus_id: +curD.bus_id
        })
        setCrOpen(true)
        getDs()

    }
    const getDs = async () => {
        const {data} = await axios.get('user?alias=operator')
        setDests(data.data.users)
    }
    const getBuses = async () => {
        const {data} = await axios.get('bus')
        setBuses(data.data.buses)
    }
    const del = async (id) => {
        await axios.delete(`user/${id}`)
        getDs()
    }

    useEffect(()=> {
        getDs()
        getBuses()
    },[])
    return (
        <div>
            <h2>Operators</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login</th>
                    <th>Bus Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    dests.length && dests.map((el,index) => (
                        <tr key={el.id}>
                            <td>{el.name}</td>
                            <td>{el.login}</td>
                            <td>{el.bus_name}</td>
                            <td><span className="del" onClick={()=> del(el.id)}> Delete</span></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className="create">
                {
                    crOpen && <button onClick={() => setCrOpen(false)}>Create an operator</button>
                }

                {
                    !crOpen &&
                    <div className="create-form">
                        <input type="text" name="name" onChange={changeCurD} placeholder="Name"/>
                        <input type="text" name="login" onChange={changeCurD} placeholder="Login"/>
                        <input type="password" name="password" onChange={changeCurD} placeholder="Password"/>
                        <select className="select" name="bus_id" onChange={changeCurD}>
                            {
                                buses && buses.length > 0 && buses.map(el => (
                                    <option value={el.id}>{el.name}</option>
                                ))
                            }
                        </select>

                        <div className="c-p lbtn" onClick={createDest}>
                            Create
                        </div>

                        <div className="c-p lbtn" onClick={() => setCrOpen(true)}>
                            Cancel
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Operators;
