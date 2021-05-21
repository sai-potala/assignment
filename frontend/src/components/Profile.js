import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


function Profile(props) {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [userInfo, setUserinfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo"))
  );
  const [userData, setUserdata] = useState(null);
  const [errorMessage, setErrormessage] = useState("");
  const [successMessage, setSuccessmessage] = useState("");
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(userInfo.image);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      userInfo.name === name &&
      userInfo.email === email &&
      userInfo.mobile === mobile &&
      password === "" &&
      image === ""
    ) {
      setErrormessage("Please change some value to update");
      return;
    }
    try {
      const updatedData = {
        name: name === userInfo.name ? null : name,
        email: email === userInfo.email ? null : email,
        mobile: mobile === userInfo.mobile ? null : mobile,
        password: password === "" ? null : password,
        image: image === "" ? null : image,
      };
      console.log("updated data is ",updatedData)
      const { data } = await axios.put(
        `http://localhost:5000/user/updateUser/${userInfo._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserinfo(data);
      sessionStorage.setItem("userInfo",JSON.stringify(data))
      setSuccessmessage("Details Updated Successfully");
    } catch (err) {
      setErrormessage(err.response.data.message);
    }
  };

  const fileupload = (files) => {
    if (files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const Base64 = reader.result;
        setImage(Base64);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  const deleteHandler = async (user) => {
    console.log(user);
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/user/delete/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserdata(data);
    } catch (err) {
      setErrormessage(err.response.data.message);
    }
  };
  useEffect(() => {
    if (userInfo.isAdmin) {
      axios
        .get(`http://localhost:5000/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          console.log("data is ", data.data);
          setUserdata(data.data);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <div className="grid-container">
      <main>
        <div>
          <form className="form-dashboard" onSubmit={submitHandler}>
            {errorMessage && (
              <div>
                <h3 className="error-message">{errorMessage}</h3>
              </div>
            )} 
            {successMessage && (
              <div>
                <h3 className="success-message">{successMessage}</h3>
              </div>
            )}
            <div className="form-image">
              {image ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  src={image}
                  alt="no image uploaded"
                  style={{ height: "200px" }}
                />
              ) : (
                <h4>No image Uploaded</h4>
              )}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="number"
                id="mobile"
                placeholder="Enter Mobile No"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
                <label htmlFor="">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                style={{ padding: "0px", border: "0px solid black" }}
                onChange={(e) => fileupload(e.target.files)}
              />
            </div>
            <div style={{ margin: "10px" }}>
              <button className="small" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
        {userData ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <td>
                      <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

export default Profile;
