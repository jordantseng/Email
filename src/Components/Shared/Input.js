import React from './node_modules/react';
import { Field, ErrorMessage } from './node_modules/formik';

import ErrorText from './ErrorText';

const Input = ({ label, id, name, ...props }) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Field name={name} {...props} />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Input;
