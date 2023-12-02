import { useForm } from "react-hook-form";
import Button from "./Button";
import style from "./From.module.css";
import Graph from "./Graph";
import { updateUser } from "../utils/updateUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserDetails } from "../utils/getUserDetails";

function Form({ charge, amount, id, setUserData }) {
  const [category, setCategory] = useState(+amount.category_6);
  const [category1, setCategory1] = useState(+amount.category_7);
  const [category2, setCategory2] = useState(+amount.category_8);
  const [category3, setCategory3] = useState(+amount.category_9);
  const [category4, setCategory4] = useState(+amount.category_10);
  const [isGrey, setIsGrey] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: amount });

  const data = [
    { name: "category", requests: category },
    { name: "category1", requests: category1 },
    { name: "category2", requests: category2 },
    { name: "category3", requests: category3 },
    { name: "category4", requests: category4 },
  ];

  useEffect(
    function () {
      if (
        category < 99 ||
        category1 < 79 ||
        category2 < 59 ||
        category3 < 39 ||
        category4 < 19
      )
        setIsGrey(true);
      else setIsGrey(false);
    },
    [category, category1, category2, category3, category4]
  );

  async function setUserDetails() {
    const data = await getUserDetails(id);
    setUserData(data.data);
  }

  async function onSubmit(formData) {
    const newData = {
      amount: formData,
    };
    const updatedData = await updateUser(id, newData);
    // console.log(updatedData);
    if (updatedData.status === 200) {
      toast.success("Update successfull.");
      setUserDetails();
    } else toast.error(updatedData.ui_err_msg);
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={`${style.row} ${!charge ? "grey" : ""}`}>
        <div className={style.left}>Custom song request amount-</div>
        <div className={style.right}>
          <input
            type="number"
            className={style.input}
            {...register("category_6", {
              required: "This feild is required",
              min: {
                value: 99,
                message: "Value should be greater than 99",
              },
            })}
            disabled={!charge}
            onBlur={(e) => setCategory(+getValues("category_6"))}
          />
          <span className={style.error}>
            {errors?.category_6?.message ? ">=99" : ""}
          </span>
        </div>
      </div>

      <div className={`${style.row} ${!charge ? "grey" : ""}`}>
        <div className={style.left}>
          Regular song request amounts, <br />
          from high to low-
        </div>
        <div className={style.right}>
          <div className={style.smallBlock}>
            <input
              type="number"
              className={`${style.input} ${style.small}`}
              {...register("category_7", {
                required: "This feild is required",
                min: {
                  value: 79,
                  message: "Value should be greater than 79",
                },
              })}
              disabled={!charge}
              onBlur={(e) => setCategory1(+getValues("category_7"))}
            />
            <span className={style.error}>
              {errors?.category_7?.message ? ">=79" : ""}
            </span>
          </div>
          <div className={style.smallBlock}>
            <input
              type="number"
              className={`${style.input} ${style.small}`}
              {...register("category_8", {
                required: "This feild is required",
                min: {
                  value: 59,
                  message: "Value should be greater than 59",
                },
              })}
              disabled={!charge}
              onBlur={(e) => setCategory2(+getValues("category_8"))}
            />
            <span className={style.error}>
              {errors?.category_8?.message ? ">=59" : ""}
            </span>
          </div>
          <div className={style.smallBlock}>
            <input
              type="number"
              className={`${style.input} ${style.small}`}
              {...register("category_9", {
                required: "This feild is required",
                min: {
                  value: 39,
                  message: "Value should be greater than 39",
                },
              })}
              disabled={!charge}
              onBlur={(e) => setCategory3(+getValues("category_9"))}
            />
            <span className={style.error}>
              {errors?.category_9?.message ? ">=39" : ""}
            </span>
          </div>
          <div className={style.smallBlock}>
            <input
              type="number"
              className={`${style.input} ${style.small}`}
              {...register("category_10", {
                required: "This feild is required",
                min: {
                  value: 19,
                  message: "Value should be greater than 19",
                },
              })}
              disabled={!charge}
              onBlur={(e) => setCategory4(+getValues("category_10"))}
            />
            <span className={style.error}>
              {errors?.category_10?.message ? ">=19" : ""}
            </span>
          </div>
        </div>
      </div>

      {charge && (
        <div className={style.graphContainer}>
          <Graph data={data} style={style.icon} />
        </div>
      )}

      <div className={`${!charge || isGrey ? "grey" : ""}`}>
        <Button disabled={!charge || isGrey ? true : ""} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

export default Form;
