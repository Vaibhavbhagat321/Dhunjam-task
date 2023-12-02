import style from "./Heading.module.css";

function Heading({ children, name, location }) {
  if (name && location)
    return (
      <h1 className={style.heading}>{`${name}, ${location} ${children}`}</h1>
    );
  else return <h1 className={style.heading}>{children}</h1>;
}

export default Heading;
