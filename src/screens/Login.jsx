import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { login } from "../store/features/authSlice";
import { Eye, EyeClosed } from "lucide-react";
import { Main } from "../utils/Animations";

function Login() {
  const dispatch = useDispatch();
  const [pass, setPass] = useState(true);

  return (
    <Main>
       <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            dispatch(login(values));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="p-20 rounded-3xl border shadow-xl bg-black bg-opacity-65 shadow-black border-gray-500 border-dashed"
          >
            <p className="text-center">Login</p>
            <div>
              <input
                className="inputcts"
                placeholder="email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="reg">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div>
              <div className="flex">
                <input
                  className="inputcts"
                  placeholder="password"
                  type={pass ? "password" : "text"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button className="px-2 ml-2 mt-6 border rounded-md bg-white bg-opacity-40" onClick={() => setPass(!pass)}>
                  {pass ? <Eye /> : <EyeClosed />}
                </button>
              </div>
              <p className="reg">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <button type="submit" className="btncs mt-6" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </Main>
  );
}

export default Login;
