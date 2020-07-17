import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

const validationSchema = yup.object({
  to: yup.string().email().required(),
  from: yup.string().email().required(),
  subject: yup.string().required(),
});

const EmailForm = ({ email, onEmailSubmitClick }) => {
  const onEmailFormSubmit = (values, action) => {
    action.setSubmitting(true);
    onEmailSubmitClick(values);
  };

  return (
    <div>
      <Formik
        initialValues={email}
        validationSchema={validationSchema}
        onSubmit={onEmailFormSubmit}>
        {({ values, errors, isSubmitting }) => (
          <Form className="ui form">
            <Input label="To" type="text" id="to" name="to" />
            <Input label="From" type="text" id="from" name="from" />
            <Input label="Subject" type="text" id="subject" name="subject" />
            <Textarea label="Content" id="content" name="text" />

            <button
              className="ui submit button primary"
              type="submit"
              disabled={isSubmitting}>
              Submit
            </button>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailForm;
