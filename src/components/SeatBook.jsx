import React, {useState, useEffect} from "react";
import classnames from "classnames"
import front from "../assets/img/seat-front.png"
import axios from "axios";

const seats1 = []
const seats2 = []

const seats3 = []
for(let i =1; i<20; i++) {
    if(i<=5) {
        seats1[i] = i
    } else if(i > 5 && i<=10) {
        seats2[i] = i
    }else if(i > 10 && i<=15) {
        seats3[i] = i
    }
}
const SeatBook = ({bookedSeats, reserve,busId}) => {
    const [selected,setSelected] = useState(null)
    const handleClick = el => {
        if(selected == el) {
            setSelected(null)
        } else {
            setSelected(el)
        }
    }

    const handleReserve = () => {
        reserve(selected,busId)
    }
    return (
        <div className="seatBook">
            <div className="seatbookwrapper">
                <div>
                    <img src={front} alt=""/>
                </div>
                <table className="seatTable">
                    <tr>
                        {
                            seats1.map(el => (
                                <td>
                                    <div className={classnames({"seat": true, "booked": bookedSeats.includes(el), "selecteds": selected === el})} onClick={()=> handleClick(el)} >
                                        <span>{el}</span>
                                    </div>
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        {
                            seats2.map(el => (
                                <td>
                                    <div className={classnames({"seat": true, "booked": bookedSeats.includes(el), "selecteds": selected === el})} onClick={()=> handleClick(el)} >
                                        <span>{el}</span>
                                    </div>
                                </td>
                            ))
                        }
                    </tr>
                    <br/>
                    <tr>
                        {
                            seats3.map(el => (
                                <td>
                                    <div className={classnames({"seat": true, "booked": bookedSeats.includes(el), "selecteds": selected === el})} onClick={()=> handleClick(el)}>
                                        <span>{el}</span>
                                    </div>
                                </td>
                            ))
                        }
                    </tr>

                </table>

            </div>
            <button className="res-btn" onClick={handleReserve}>
                Reserve
            </button>
        </div>
    );
};

export default SeatBook;
