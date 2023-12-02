import style from "./RadioButtonRow.module.css";

function RadioButtonRow({ chargeCustomer, setChargeCustomer }) {
  return (
    <div className={style.row}>
      <div className={style.left}>
        <p>Do you want to charge your customers for requesting songs?</p>
      </div>
      <div className={style.radioContainer}>
        <div className={style.radioGroup}>
          <label className={style.radio}>
            <input
              type="radio"
              value="yes"
              name="request"
              onChange={(e) => setChargeCustomer(e.target.value)}
              checked={chargeCustomer === "yes"}
            />
            <span></span>
            Yes
          </label>
        </div>
        <div className={style.radioGroup}>
          <label className={style.radio}>
            <input
              type="radio"
              value="no"
              name="request"
              onChange={(e) => setChargeCustomer(e.target.value)}
              checked={chargeCustomer === "no"}
            />
            <span></span>
            No
          </label>
        </div>
      </div>
    </div>
  );
}

export default RadioButtonRow;
