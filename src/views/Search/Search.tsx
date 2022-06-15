import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
// Components
import Button from "components/Button/Button";
import Box from "components/Box/Box";
// Interfaces
import { SearchOption, ButtonVariant } from "interfaces";
// Router
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  repository: string;
  input: SearchOption;
}

const initialFormValues: FormValues = {
  username: "",
  repository: "",
  input: SearchOption.username,
};

const formValidationSchema = Yup.object().shape({
  username: Yup.string().when("input", {
    is: SearchOption.username,
    then: Yup.string().min(3, "Minimal string length is 3").required(),
  }),
  repository: Yup.string().when("input", {
    is: SearchOption.repository,
    then: Yup.string().min(3, "Minimal string length is 3").required(),
  }),
});

const Search = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      searchSwitch(values);
    },
  });

  const searchSwitch = (values: FormValues) => {
    switch (values.input) {
      case SearchOption.username:
        return searchUsername(values);
      case SearchOption.repository:
        return searchRepositories(values);
    }
  };

  const searchUsername = (values: FormValues) => {
    navigate(`/username/${values.username}`);
  };

  const searchRepositories = (values: FormValues) => {
    navigate(`/repositories/${values.repository}?page=0`);
  };

  return (
    <Box>
      <h3>Search by</h3>
      <div className={styles.searchOptions}>
        <form onSubmit={formik.handleSubmit}>
          <fieldset>
            <div
              className={
                formik.values.input === SearchOption.username
                  ? `${styles.radioElement} ${styles.active}`
                  : `${styles.radioElement}`
              }
            >
              <input
                type="radio"
                id={SearchOption.username}
                checked={formik.values.input === SearchOption.username}
                onChange={() =>
                  formik.setFieldValue("input", SearchOption.username)
                }
              />
              <label htmlFor={SearchOption.username}>username</label>
            </div>
            <div
              className={
                formik.values.input === SearchOption.repository
                  ? `${styles.radioElement} ${styles.active}`
                  : `${styles.radioElement}`
              }
            >
              <input
                type="radio"
                id={SearchOption.repository}
                checked={formik.values.input === SearchOption.repository}
                onChange={() =>
                  formik.setFieldValue("input", SearchOption.repository)
                }
              />
              <label htmlFor={SearchOption.repository}>repository name</label>
            </div>
          </fieldset>
          <div className={styles.inputTermContainer}>
            {formik.values.input === SearchOption.username && (
              <>
                <label htmlFor="username">Input username</label>
                <input
                  type="text"
                  id="username"
                  onChange={formik.handleChange}
                />
              </>
            )}
            {formik.values.input === SearchOption.repository && (
              <>
                <label htmlFor="repository">Input repository name</label>
                <input
                  type="text"
                  id="repository"
                  onChange={formik.handleChange}
                />
              </>
            )}
            <Button type="submit" variant={ButtonVariant.primary}>
              Search
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default Search;
