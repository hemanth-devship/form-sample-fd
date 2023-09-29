import { useState } from "react";
import axios from "axios";
import "../App.css";

export const Login = () => {
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // const formData = new FormData();
    let data = {
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value,
    };

    console.log("Submit form");
    axios
      .post("http://localhost:4000/login", data)
      .then((res) => {
        console.log(res);
        setUser(res.data);
        // event.target.reset();
        setStatus(true);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setError(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <h3>Login</h3>
      {!status && (
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 form-floating ">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="mb-3 form-floating ">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              aria-describedby="passwordHelp"
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
      {status && (
        <div>
          <h4>{user?.message}</h4>

          <p>
            Hello {user?.firstName} {user?.lastName}
          </p>
        </div>
      )}
    </div>
  );
};
