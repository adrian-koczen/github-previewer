import React from "react";
import { useFormik } from "formik";
import styles from "./styles.module.scss";
// Components
import Button from "components/Button/Button";
import Box from "components/Box/Box";
// Interfaces
import { SearchOption } from "interfaces";

interface FormValues {
  searchTerm: string;
  input: SearchOption;
}

const initialFormValues: FormValues = {
  searchTerm: "",
  input: SearchOption.username,
};

const Search = () => {
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box>
      <h3>Search by</h3>
      <div className={styles.searchOptions}>
        <form onSubmit={formik.handleSubmit}>
          <fieldset>
            <div className={styles.radioElement}>
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
            <div className={styles.radioElement}>
              <input
                type="radio"
                id={SearchOption.repository}
                checked={formik.values.input === SearchOption.repository}
                onChange={() =>
                  formik.setFieldValue("input", SearchOption.repository)
                }
              />
              <label htmlFor={SearchOption.repository}>repository</label>
            </div>
          </fieldset>
          <label htmlFor="searchTerm">
            Input{" "}
            {formik.values.input === SearchOption.username
              ? "username"
              : "repository"}
          </label>
          <input type="text" id="searchTerm" onChange={formik.handleChange} />
          <Button type="submit">Wyszukaj</Button>
        </form>
      </div>
    </Box>
  );
};

export default Search;
