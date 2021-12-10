import React, {useEffect, useState} from "react";
import axios from "axios";


const Account = () => {
  const [userType] = useState(localStorage.getItem('userType'));
  const [userId] = useState(localStorage.getItem('uId'));
  const [history, setHistory] = useState([])
    const getDs = async () => {
        const {data} = await axios.get(`user-buses/${userId}`)

        setHistory(data.data.buses)
    }
    useEffect(()=> {
        getDs()
    },[])
  return (
      <div >
          <h2>Account</h2>
          <p>Usertype is {userType}</p>

          {
              userType === "client" &&
              <div className="history">
                  <h2>User reservation history</h2>
                  <table className="table">
                      <thead>
                      <tr>
                          <th>Bus Count/Name</th>
                          <th>Destination Name</th>
                          <th>Seat Number</th>
                          <th>Booked date</th>
                          <th>Start time</th>
                          <th>ENd time</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                          history && history.length && history.map((el) => (
                              <>
                                  <tr key={el.id}>
                                      <td>{el.bus_name}</td>
                                      <td>{el.destination_name}</td>
                                      <td>{el.seat_number}</td>
                                      <td>{el.booked_date}</td>
                                      <td>{el.start_time}</td>
                                      <td>{el.end_time}</td>
                                  </tr>
                              </>
                          ))
                      }
                      </tbody>
                  </table>
              </div>
          }

      </div>
  );
};

export default Account;
