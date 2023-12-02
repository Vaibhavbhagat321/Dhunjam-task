import Form from "../components/Form";
import Heading from "../components/Heading";
import RadioButtonRow from "../components/RadioButtonRow";
import style from "./AdminDashboard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../utils/getUserDetails";

function AdminDashboard({ user }) {
  const [userData, setUserData] = useState({});
  const [chargeCustomer, setChargeCustomer] = useState("");
  const charge = chargeCustomer === "yes";

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user.id) navigate("/login");
      async function getDetails() {
        const data = await getUserDetails(user.id);
        setUserData(data.data);
        setChargeCustomer(data.data.charge_customers ? "yes" : "no");
      }
      if (user.id) getDetails();
    },
    [user.id, navigate]
  );

  return (
    <div className={style.dashboard}>
      <div>
        <Heading name={userData.name} location={userData.location}>
          on Dhum Jam
        </Heading>
      </div>
      {chargeCustomer && (
        <RadioButtonRow
          chargeCustomer={chargeCustomer}
          setChargeCustomer={setChargeCustomer}
        />
      )}
      {userData.name && (
        <Form
          charge={charge}
          amount={userData.amount}
          id={user.id}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
