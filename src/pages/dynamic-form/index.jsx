import {
  useFormik,
  FieldArray,
  FormikProvider,
  Form,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import DebouncedInput from "../../components/debounce-input-field";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const DynamicForm = () => {
  let navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const validationSchema = Yup.object({
    searchFields: Yup.array().of(Yup.string().required("Required")),
  });

  const formik = useFormik({
    initialValues: {
      searchFields: [""],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Search Fields:", values);
    },
  });

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <FieldArray name="searchFields">
          {({ push, remove }) => (
            <>
              {formik.values.searchFields.map((_, index) => (
                <div key={index}>
                  <DebouncedInput
                    value={formik.values.searchFields[index]}
                    onChange={(value) => {
                      const newValues = [...formik.values.searchFields];
                      newValues[index] = value;
                      formik.setFieldValue("searchFields", newValues);
                    }}
                  />
                  <ErrorMessage
                    name={`searchFields[${index}]`}
                    component="div"
                    className="field-error"
                  />
                  {isAuthenticated && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove Field
                    </button>
                  )}
                  <br></br>
                  {formik.values.searchFields[index]}
                </div>
              ))}

              {isAuthenticated && (
                <button type="button" onClick={() => push("")}>
                  Add Search Field
                </button>
              )}
              <button type="submit">Submit</button>
              {isAuthenticated && (
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              )}
              <button type="button" onClick={handleLogin}>
                Add Input Fields
              </button>
            </>
          )}
        </FieldArray>
      </Form>
    </FormikProvider>
  );
};

export default DynamicForm;
