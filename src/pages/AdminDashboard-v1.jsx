import Button from "../components/Button";
import Graph from "../components/Graph";
import Heading from "../components/Heading";
import style from "./AdminDashboard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ user }) {
  const [category, setCategory] = useState(0);
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [category4, setCategory4] = useState(0);
  const [userData, setUserData] = useState({});
  const {
    name,
    charge_customers,
    location,
    amount: {
      category_6,
      category_7,
      category_8,
      category_9,
      category_10,
    } = {},
  } = userData;

  const [charge, setCharge] = useState(!charge_customers ? "yes" : "no");
  const greyOut = charge === "no";
  const navigate = useNavigate();

  const data = [
    { name: "category", requests: category_6 },
    { name: "category1", requests: category_7 },
    { name: "category2", requests: category_8 },
    { name: "category3", requests: category_9 },
    { name: "category4", requests: category_10 },
  ];

  useEffect(
    function () {
      if (!user.id) navigate("/login");
      async function getUserData() {
        const res = await fetch(
          `https://stg.dhunjam.in/account/admin/${user.id}`
        );
        const data = await res.json();
        setUserData(data.data);
        // console.log(userData);
      }
      if (user.id) getUserData();
    },
    [user.id, navigate]
  );

  return (
    <div className={style.dashboard}>
      <div>
        <Heading name={name} location={location}>
          on Dhum Jam
        </Heading>
      </div>

      <div className={style.row}>
        <div className={style.left}>
          <p>Do you want to change your customers for requesting songs?</p>
        </div>
        <div className={style.radioContainer}>
          <div className={style.radioGroup}>
            <input
              type="radio"
              value="yes"
              id="yes"
              name="request"
              onChange={(e) => setCharge(e.target.value)}
              checked={charge === "yes"}
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className={style.radioGroup}>
            <input
              type="radio"
              value="no"
              id="no"
              name="request"
              onChange={(e) => setCharge(e.target.value)}
              checked={charge === "no"}
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
      </div>

      <div className={`${style.row} ${greyOut ? "grey" : ""}`}>
        <div className={style.left}>Custom song request amount-</div>
        <div className={style.right}>
          <input
            type="text"
            className={style.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={greyOut}
          />
        </div>
      </div>

      <div className={`${style.row} ${greyOut ? "grey" : ""}`}>
        <div className={style.left}>
          Regular song request amounts, <br />
          from high to low-
        </div>
        <div className={style.right}>
          <input
            type="text"
            className={`${style.input} ${style.small}`}
            value={category1}
            onChange={(e) => setCategory1(e.target.value)}
            disabled={greyOut}
            defaultValue={category_6}
          />
          <input
            type="text"
            value={category2}
            onChange={(e) => setCategory2(e.target.value)}
            className={`${style.input} ${style.small}`}
            disabled={greyOut}
          />
          <input
            type="text"
            className={`${style.input} ${style.small}`}
            value={category3}
            onChange={(e) => setCategory3(e.target.value)}
            disabled={greyOut}
          />
          <input
            type="text"
            className={`${style.input} ${style.small}`}
            value={category4}
            onChange={(e) => setCategory4(e.target.value)}
            disabled={greyOut}
          />
        </div>
      </div>

      {charge === "yes" && (
        <div className={style.graphContainer}>
          <Graph data={data} style={style.icon} />
        </div>
      )}
      <div className={greyOut ? "grey" : ""}>
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default AdminDashboard;
