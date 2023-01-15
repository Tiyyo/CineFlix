import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

const Essai = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <div className="essai">
      <h5>Ca Marche</h5>
    </div>
  );
};

export default Essai;
