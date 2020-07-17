import React from 'react';
import { useField, Field } from 'formik';

const Textarea = ({ label, id, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Field {...field} {...props}>
        {({ field }) => <textarea {...field}></textarea>}
      </Field>
      {meta.error && meta.touched ? (
        <div className="ui pointing red basic label">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Textarea;
