import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Destination = () => {
    const [dests,setDests] = useState([])
    const [curD,setCurD] = useState({
        distance: 0,
        from: "",
        price: 0,
        to: ""
    })
    const [crOpen,setCrOpen] = useState(true)
    const changeCurD = (event) => {
        setCurD({
            ...curD,
            [event.target.name]: event.target.value
        })
    }
    const createDest = async () => {
        await axios.post('destination', {
            ...curD,
            distance: Number(curD.distance),
            price: Number(curD.price)
        })
        setCrOpen(true)
        getDs()

    }
    const getDs = async () => {
        const {data} = await axios.get('destination')
        setDests(data.data.destinations)
    }
    const del = async (id) => {
        await axios.delete(`destination/${id}`)
        getDs()
    }

    useEffect(()=> {
        getDs()
    },[])
  return (
      <div>
          <div className="with-link link5">
              <h2>Destinations</h2>
          </div>
          <table className="table">
              <thead>
                <tr>
                    <th>Distance</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Price</th>
                    <th>Bus stops</th>
                    <th>Buses</th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
              {
                 dests.length && dests.map((el,index) => (
                      <tr key={el.id}>
                          <td>{el.distance}</td>
                          <td>{el.from}</td>
                          <td>{el.to}</td>
                          <td>{el.price}</td>
                          <td><span className="c-p"><Link to={`bus-stop/${el.id}`}>See bus stops</Link></span></td>
                          <td><span className="c-p"><Link to={`buses/${el.id}`}>See buses</Link></span></td>
                          <td><span className="del" onClick={()=> del(el.id)}> Delete</span></td>
                      </tr>
                  ))
              }
              </tbody>
          </table>
          <div className="create">
              {
                  crOpen && <button onClick={() => setCrOpen(false)}>Create Destination</button>
              }

              {
                  !crOpen &&
                  <div className="create-form">
                      <input type="number" name="distance" onChange={changeCurD} placeholder="distance"/>
                      <input type="text" name="from" onChange={changeCurD} placeholder="From"/>
                      <input type="number" name="price" onChange={changeCurD} placeholder="Price"/>
                      <input type="text" name="to" onChange={changeCurD} placeholder="To"/>

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
