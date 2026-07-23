import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const login = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res = await api.post("/auth/login", {

        email,

        password,

      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

    } catch {

      setError("Invalid Email or Password");

    }

    setLoading(false);

  };

  return (

    <div
      style={{
        width: "420px",
        margin: "80px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,.15)"
      }}
    >

      <h1>Task Management</h1>

      <p>Please Login</p>

      <form onSubmit={login}>

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px"
          }}

        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px"
          }}

        />

        {

          error &&

          <p style={{color:"red"}}>

            {error}

          </p>

        }

        <button

          style={{

            width:"100%",

            padding:"12px",

            cursor:"pointer"

          }}

        >

          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }

        </button>

      </form>

    </div>

  );

}

export default Login;