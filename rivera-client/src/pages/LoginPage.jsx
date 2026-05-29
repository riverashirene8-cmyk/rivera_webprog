//import React, { useState } from "react";
//import { useNavigate, Link } from "react-router-dom";
//import { loginUser } from "../services/UserService";

//function LoginPage() {
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    //const [error, setError] = useState("");

    //const navigate = useNavigate();

    //const handleLogin = async (e) => {
      //  e.preventDefault();

        //try {
          //  const { data } = await loginUser({ email, password });

            // ❌ BLOCK VIEWERS
            //if (data.type === "viewer") {
              //  setError("Viewers are not allowed to login.");
                //return;
           // }

           // localStorage.setItem("token", data.token);
           // localStorage.setItem("firstName", data.firstName);
           // localStorage.setItem("type", data.type);

            //navigate("/dashboard", {
              //  state: {
                 //   firstName: data.firstName,
                   // type: data.type,
               // },
            //});
       // } catch (err) {
          //  setError(
              //  err.response?.data?.message ||
                  //  "Login failed"
          //  );
      //  }
  //  };
//
   // return (
       // <div>
         //   <h2>Login</h2>

           // {error && <p style={{ color: "red" }}>{error}</p>}

           // <form onSubmit={handleLogin}>
          //      <input
                 //   type="email"
             //       placeholder="Email"
                    value={email}
                 //   onChange={(e) =>
                   //     setEmail(e.target.value)
                   // }
            //    />

            //    <input
                 //   type="password"
                  //  placeholder="Password"
                  //  value={password}
                 //   onChange={(e) =>
                    //    setPassword(e.target.value)
                  //  }
             //   />

              //  <button type="submit">Login</button>
          //  </form>

       //     <Link to="/signup">Sign Up</Link>
     //   </div>
  //  );

//export default LoginPage;