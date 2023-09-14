import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../Redux/Actions/LoginActions";
import axios from 'axios'

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading }= useSelector(state => state.login);
  const onSubmit = async (values) => {
    dispatch(loginAction(values));  
  };

  const phoneRegExp = /^[0-9]{10}$/;


  let validationSchema = Yup.object().shape({
    username: Yup.string("Enter your mobile number")
      .required("Mobile Number is required field")
      .matches(phoneRegExp, "Mobile Number should be in number format"),
    password: Yup.string().required("Password is required field"),
  });

  return (
    <div className="loginContainer">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched }) => (
              <Form className="login">
                <div>
                  <h1>Login</h1>
                </div>

                <div className="form-group w-75 m-auto">
                  <Field
                    name="username"
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="form-control mt-3"
                    autoComplete="off"
                  />
                  {touched.username && errors.username ? (
                    <small className="text-danger" style={{ color: "red" }}>
                      {errors.username}
                    </small>
                  ) : null}
                </div>

                <div className="form-group w-75 m-auto">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="form-control mt-3"
                    autoComplete="off"
                  />
                  {touched.password && errors.password ? (
                    <small className="text-danger" style={{ color: "red" }}>
                      {errors.password}
                    </small>
                  ) : null}
                </div>

                <div className="form-group w-75 m-auto">
                  <button
                    type="submit"
                    className="btn btn-primary  submitBtn w-100 mt-2"
                  >
                    {isLoading? "Loading": "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
