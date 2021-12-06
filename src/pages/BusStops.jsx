import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link,useParams} from "react-router-dom";
const Destination = ({ match }) => {
    const [dests,setDests] = useState([])
    const {dId} = useParams()
    const [curD,setCurD] = useState({
        destination_id: +dId,
        distance: "",
        name: 0
    })
    const [crOpen,setCrOpen] = useState(true)
    const changeCurD = (event) => {
        setCurD({
            ...curD,
            [event.target.name]: event.target.value
        })
    }
    const createDest = async () => {
        await axios.post('bus-stop', {
            ...curD,
            distance: Number(curD.distance),
        })
        setCrOpen(true)
        getDs()
    }
    const getDs = async () => {
        const {data} = await axios.get(`bus-stop/${dId}`)
        setDests(data.data.bus_stopes)
        console.log(data.data)
    }
    const del = async (id) => {
        await axios.delete(`bus-stop/${id}`)
        getDs()
    }

    useEffect(()=> {
        getDs()
    },[])
  return (
      <div>
          <h2>Bus Stops</h2>
          <table className="table">
              <thead>
                <tr>
                    <th>Distance</th>
                    <th>Name</th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
              {
                 dests.length && dests.map((el) => (
                      <tr key={el.id}>
                          <td>{el.distance}</td>
                          <td>{el.bus_stop}</td>
                          <td><span className="del" onClick={()=> del(el.id)}>Delete</span></td>
                      </tr>
                  ))
              }
              </tbody>
          </table>
          <div className="create">
              {
                  crOpen && <button onClick={() => setCrOpen(false)}>Create Bus Stop</button>
              }

              {
                  !crOpen &&
                  <div className="create-form">
                      <input type="number" name="distance" onChange={changeCurD} placeholder="Distance"/>
                      <input type="text" name="name" onChange={changeCurD} placeholder="Name"/>

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

export default Destination;
