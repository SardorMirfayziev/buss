import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Home = () => {

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
          <h2>Destinations</h2>
          <table className="table">
              <thead>
                <tr>
                    <th>Distance</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Price</th>
                    <th>Bus Stops</th>
                    <th>Buses</th>
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
                      </tr>
                  ))
              }
              </tbody>
          </table>

      </div>
  );
};

export default Home;
