import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import style from "./Login.module.css";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { getUser } from "../utils/getUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login({ setUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    if (!username || !password) return;
    setIsLoading(true);
    const data = await getUser({ username, password });
    setIsLoading(false);
    if (data.status === 200) {
      setUser({ id: data.data.id, token: data.data.token });
      toast.success("Login successful.");
      navigate("/dashboard");
    } else toast.error(data.ui_err_msg);
  }

  return (
    <div className={style.login}>
      <div>
        <Heading>Venue Admin Login</Heading>
      </div>
      <div className={style.inputContainer}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={style.input}
        />
        <input
          type={`${showPassword ? "text" : "password"}`}
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />
        <span
          className={style.iconPosition}
          onClick={() => setShowPassword((state) => !state)}
        >
          {showPassword ? (
            <HiEye className={style.icon} />
          ) : (
            <HiEyeSlash className={style.icon} />
          )}
        </span>
      </div>
      <div className={style.inputContainer}>
        <Button onclick={login} disabled={isLoading}>
          Sign In
        </Button>
        <p>New Registration?</p>
      </div>
    </div>
  );
}

export default Login;
