import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth();
  let navigate = useNavigate();
  const [errorMsg, setError] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const flag = await login(values);
      flag
        ? navigate("/")
        : setError("Please enter valid username or password");
    } catch (error) {
      console.error("Login failed", error, "user not authenticated");
    }
  };

  return (
    <div>
      <h3>Login Form</h3>
      <h4>( username:jonh doe,password:jonhdoe )</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {() => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <h4>{errorMsg}</h4>
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
