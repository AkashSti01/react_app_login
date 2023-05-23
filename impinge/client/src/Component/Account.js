import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Validation, loginValidation } from "../formValidation/formValidation";
import { Formik, Form } from "formik";
import TextField from "../common/textField";

const Account = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [signin, setSignin] = useState(false);
  const [user, setUser] = useState();

  const singupForm = (e) => {
    setSignin(true);
  };

  const loginForm = (e) => {
    setSignin(false);
  };
  const Auth = async (values) => {
    console.log("--------auth", values);
    try {
      const token = localStorage.getItem("token");
      let response = await axios.post("http://localhost:8000/login", values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "Failed") {
        toast.warn("Please enter valid credentials !");
        navigate("/");
      } else {
        navigate("/dashboard");
        toast.success("Login Successfully!");
        localStorage.setItem("accessToken", response.data.access_Token);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const Register = async (values) => {
    try {
      let response = await axios.post("http://localhost:8000/register", values);
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        // Handle success
        toast(response.data.msg);
        setSignin(false);
      } else if (response.status == 201) {
        // Handle validation errors
        toast(response.data.msg);
      } else {
        // Handle other errors
        toast(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      {signin === false ? (
        <div className="container">
          <div className="login-popup-design-body custom-modal-one-body">
            <div className="login-popup-design-form">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginValidation}
                onSubmit={Auth}
              >
                {
                  <Form>
                    <h2 className=" row justify-content-center">Sign in</h2>
                    <div className="row justify-content-center my-3">
                      <div className="col-sm-6">
                        <TextField
                          type="email"
                          label="Email"
                          name="email"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center my-3">
                      <div className="col-sm-6">
                        <TextField
                          type="password"
                          label="Password"
                          name="password"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center my-3">
                      <div className="col-sm-6">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-sm-6">
                        <button
                          type="submit"
                          className="btn btn-success w-100"
                          onClick={(e) => singupForm(e)}
                        >
                          Create new account
                        </button>
                      </div>
                    </div>
                  </Form>
                }
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="login-popup-design-body custom-modal-one-body">
            <div className="login-popup-design-form">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }}
                validationSchema={Validation}
                onSubmit={Register}
              >
                {
                  <Form>
                    <h2 className="row justify-content-center">Sign up</h2>
                    <div className="row">
                      <div className="col-sm-6">
                        <TextField
                          type="text"
                          label="First Name"
                          name="firstName"
                          required={true}
                        />
                      </div>
                      <div className="col-sm-6">
                        <TextField
                          type="text"
                          label="Last Name"
                          name="lastName"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <TextField
                          type="email"
                          label="Email"
                          name="email"
                          required={true}
                        />
                      </div>
                      <div className="col-sm-6">
                        <TextField
                          type="password"
                          label="Password"
                          name="password"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <TextField
                          type="file"
                          label="Image"
                          name="file"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center my-3">
                      <button className="btn btn-primary w-50" type="submit">
                        sinup
                      </button>
                    </div>
                    <div className="row justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success w-50"
                        onClick={(e) => loginForm(e)}
                      >
                        Proceed to login
                      </button>
                    </div>
                  </Form>
                }
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Account;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { Validation } from "../formValidation/formValidation";
// import { Formik, Form } from "formik";
// import TextField from "../common/textField";

// const Account = () => {
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const [signin, setSignin] = useState(false);
//   const [user, setUser] = useState();

//   const singupForm = (e) => {
//     setSignin(true);
//   };

//   const loginForm = (e) => {
//     setSignin(false);
//   };

//   const Auth = async (e) => {
//     try {
//       e.preventDefault();
//       let response = await axios.post("http://localhost:8000/login", {});
//       if (response.data.status === "Failed") {
//         toast.warn("Please enter valid credentials !");
//         navigate("/");
//       } else {
//         navigate("/dashboard");
//         toast.success("Login Successfully!");
//         localStorage.setItem("accessToken", response.data.access_Token);
//       }
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };

//   const Register = async (e) => {
//     try {
//       e.preventDefault();
//       let response = await axios.post("http://localhost:8000/register", {});
//       if (response.data.status === "Success") {
//         setSignin(false);
//         toast.success("Register Successfully!");
//       } else {
//         toast.warn("All fields are required!");
//       }
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };

//   useEffect(() => {
//     // Auth();
//     // Register();
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       {!signin ? (
//         <div className="container">
//           <div className="login-popup-design-body custom-modal-one-body">
//             <div className="login-popup-design-form">
//               <Formik
//                 initialValues={{
//                   email: "",
//                   password: "",
//                 }}
//                 validationSchema={Validation}
//                 onSubmit={Auth} // Added onSubmit handler
//               >
//                 {() => (
//                   <Form>
//                     <h2 className="row justify-content-center">Sign in</h2>
//                     <div className="row justify-content-center my-3">
//                       <div className="col-sm-6">
//                         <TextField
//                           type="email"
//                           label="Email"
//                           name="email"
//                           required={true}
//                         />
//                       </div>
//                     </div>
//                     <div className="row justify-content-center my-3">
//                       <div className="col-sm-6">
//                         <TextField
//                           type="password"
//                           label="Password"
//                           name="password"
//                           required={true}
//                         />
//                       </div>
//                     </div>
//                     <div className="row justify-content-center my-3">
//                       <div className="col-sm-6">
//                         <button
//                           className="btn btn-primary w-100"
//                           type="submit"
//                         >
//                           Login
//                         </button>
//                       </div>
//                     </div>
//                     <div className="row justify-content-center">
//                       <div className="col-sm-6">
//                         <button
//                           type="button"
//                           className="btn btn-success w-100"
//                           onClick={singupForm}
//                         >
//                           Create new account
//                         </button>
//                       </div>
//                     </div>
//                     </Form>
//                    </Formik>
//                     </div>
//                     </div>
//                     </div>):null}
//                </>
//     )
//  };
