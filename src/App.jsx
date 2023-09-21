import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({});

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    let data = {
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value,
      [event.target[2].name]: event.target[2].value,
      [event.target[3].name]: event.target[3].value,
      [event.target[4].name]: event.target[4].value,
      [event.target[5].name]: event.target[5].value,
      [event.target[6].name]: event.target[6].value,
      [event.target[8].name]: event.target[8].files[0],
    };

    for (let [key, val] of Object.entries(data)) {
      formData.append(key, val);
    }
    console.log(formData);
    if (event.target[6].value === event.target[7].value) {
      console.log("Submit form");
      axios
        .post("http://localhost:4000/users/register", formData)
        .then((res) => {
          console.log(res);
          setUser(res.data?.user);
          // event.target.reset();
          setNewUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {!newUser && (
        <div className="register">
          <h2 className="mb-3">Register</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3 form-floating ">
              <input
                className="form-control"
                type="text"
                id="firstName"
                name="firstName"
                aria-describedby="firstNameHelp"
                placeholder="First Name"
                required
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="mb-3 form-floating ">
              <input
                className="form-control"
                type="text"
                id="lastName"
                name="lastName"
                aria-describedby="lastNameHelp"
                placeholder="Last Name"
                required
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="d-flex justify-content-between">
              <label className="form-label">Gender</label>
              <div className="form-check d-flex">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  required
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check d-flex">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
            <div className="mb-3 form-floating ">
              <input
                className="form-control"
                type="text"
                id="userName"
                name="userName"
                aria-describedby="userNameHelp"
                placeholder="User Name"
                required
              />
              <label htmlFor="userName">User Name</label>
            </div>
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
            <div className="mb-3 form-floating ">
              <input
                className="form-control"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                aria-describedby="confirmPasswordHelp"
                placeholder="Confirm Password"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="input-group mb-3">
              {/* <label className="input-group-text" htmlFor="profileImg">
              Upload
            </label> */}
              <input
                type="file"
                className="form-control"
                id="profileImg"
                name="profileImg"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      )}
      {newUser && (
        <div className="user">
          <img src={user.profileImg} alt="Profile Image" />

          <p>First Name : {user.firstName}</p>
          <p>Last Name : {user.lastName}</p>
          <p>Gender : {user.gender}</p>
          <p>User Name : {user.userName}</p>
          <p>Email : {user.email}</p>
          {/* <p>{user.profileImg}</p> */}
        </div>
      )}
    </>
  );
}

export default App;
