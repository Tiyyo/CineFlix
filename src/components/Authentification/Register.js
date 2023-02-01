import React from "react";

const Register = () => {
  return (
    <div className="register-page">
    <div className="main">
        <div className="header">
            <h3>Sign In for Free !</h3>
            <p>You'll get some special features designed for you !</p>
        </div>
      <form className="register-form">
        <div className="inputWrapper username">
          <input type="text" className="inputUsername" placeholder="Username" required />
          <div className="errorUsername"></div>
        </div>
        <div className="inputWrapper firstName">
          <input type="text" className="firstName" placeholder="Jonh" required />
          <div className="errorFirstName"></div>
        </div>
        <div className="inputWrapper lastName">
          <input type="text" className="lastName" placeholder="Doe" required />
          <div className="errorLastName"></div>
        </div>
        <div className="inputWrapper email">
          <input type="email" className="email" placeholder="john.doe@gmail.com" required />
          <div className="errorEmail"></div>
        </div>
        <button type='submit'>Valid your Inscription</button>

      </form>
    </div>
    </div>
  );
};

export default Register;
