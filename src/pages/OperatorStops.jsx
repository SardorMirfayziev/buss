import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";


const OperatorStops = () => {
    const [dests,setDests] = useState([])
    const {bId} = useParams()
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
        const {data} = await axios.get(`bus-stops/${bId}`)
        setDests(data.data.bus_stops)
    }

    const del = async (id) => {
        await axios.delete(`user/${id}`)
        getDs()
    }

    const changeSt = async (id) => {
        const {data} = await axios.put(`change-status/${bId}`,{
            bus_stop_id: id
        })
        getDs()
    }

    useEffect(()=> {
        getDs()
    },[])
    return (
        <div>
            <h2>Operators</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Here ?</th>
                    <th>DIstance</th>
                    <th>Destination Name</th>
                    <th>Change Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    dests.length && dests.map((el,index) => (
                        <tr key={el.id} className={el.is_here ? "active-tr" : ""}>
                            <td>{el.bus_stop_name}</td>
                            <td>{el.is_here ? "Yes" : "No"}</td>
                            <td>{el.bus_stop_distance}</td>
                            <td>{el.destination_name}</td>
                            <td><button onClick={() => changeSt(el.bus_stop_id)}>Change to this Bus stop</button></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default OperatorStops;
