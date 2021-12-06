import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const Buses = () => {
    const {dId} = useParams()
    const [dests,setDests] = useState([])
    const [curD,setCurD] = useState({
        destination_id: +dId,
        end_time: "",
        name: "",
        seat_count: 0,
        start_time: ""
    })
    const [crOpen,setCrOpen] = useState(true)
    const changeCurD = (event) => {
        setCurD({
            ...curD,
            [event.target.name]: event.target.value
        })
    }
    const createDest = async () => {
        await axios.post('bus', {
            ...curD,
            seat_count: Number(curD.seat_count)
        })
        setCrOpen(true)
        getDs()

    }
    const reserve = async (busId) => {
        await axios.post('bus/reserve', {
            bus_id: busId
        })
        getDs()
    }
    const getDs = async () => {
        const {data} = await axios.get(`bus/${dId}`)
        setDests(data.data.buses)
        console.log(data.data)
    }
    const del = async (id) => {
        await axios.delete(`bus/${id}`)
        getDs()
    }

    useEffect(()=> {
        getDs()
    },[])
  return (
      <div>
          <h2>Destinations</h2>
          <table className="table">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Destination Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Seat Counts</th>
                    <th>Remaining Seats</th>
                    <th></th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
              {
                 dests.length && dests.map((el) => (
                      <tr key={el.id}>
                          <td>{el.name}</td>
                          <td>{el.destination_name}</td>
                          <td>{el.start_time}</td>
                          <td>{el.end_time}</td>
                          <td>{el.seat_count}</td>
                          <td>{el.remaining_seats}</td>
                          <td>
                              {
                                  el.remaining_seats > 0 ?
                                  <span className="reserve" onClick={()=> reserve(el.id)}>Reserve</span> :
                                      "No seats"
                              }
                          </td>
                          <td><span className="del" onClick={()=> del(el.id)}>Delete</span></td>
                      </tr>
                  ))
              }
              </tbody>
          </table>
          <div className="create">
              {
                  crOpen && <button onClick={() => setCrOpen(false)}>Create a Bus</button>
              }


              {
                  !crOpen &&
                  <div className="create-form">
                      <input type="text" name="name" onChange={changeCurD} placeholder="Name"/>
                      <input type="time" name="start_time" onChange={changeCurD} placeholder="Start time"/>
                      <input type="time" name="end_time" onChange={changeCurD} placeholder="End time"/>
                      <input type="number" name="seat_count" onChange={changeCurD} placeholder="Seat Count"/>

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

export default Buses;
