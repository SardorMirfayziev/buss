import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";


const CurBusLocation = () => {
    const [dests,setDests] = useState([])
    const {bId} = useParams()

    const getDs = async () => {
        const {data} = await axios.get(`bus-stops/${bId}`)
        setDests(data.data.bus_stops)
    }

    useEffect(()=> {
        const interval = setInterval(getDs, 800)
        getDs()

        return () => {
            clearInterval(interval)
        }
    },[])
    return (
        <div>
            <h2>Bus Stops</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Here ?</th>
                    <th>DIstance</th>
                    <th>Destination Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    dests.length && dests.map((el) => (
                        <tr key={el.id} className={el.is_here ? "active-tr" : ""}>
                            <td>{el.bus_stop_name}</td>
                            <td>{el.is_here ? "Yes" : "No"}</td>
                            <td>{el.bus_stop_distance}</td>
                            <td>{el.destination_name}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default CurBusLocation;
