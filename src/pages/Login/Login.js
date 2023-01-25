import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-registration">
        <button className="sign-in">Sign In</button>
        <button className="sign-up">Sign Up</button>
      </div>
      <Link to="/home">
        <div className="guest-session">
          <div className="inner-circle">
            <p>Guest Session </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
