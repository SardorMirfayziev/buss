import React, { useState } from "react";


const Account = () => {
  const [userType] = useState(localStorage.getItem('userType'))
  return (
      <div >
          <h2>Account</h2>

          <p>Usertype is {userType}</p>

      </div>
  );
};

export default Account;
