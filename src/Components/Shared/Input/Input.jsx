import React from 'react';
import { useField, Field } from 'formik';

const Input = ({ label, id, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Field {...field} {...props} />
      {meta.error && meta.touched ? (
        <div className="ui pointing red basic label">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
