import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import authService from '../apis/auth';
import { UserContext } from '../context/UserContext';

import Input from '../components/Shared/Input';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Signin = ({ history }) => {
  const { authenticate } = useContext(UserContext);

  const onSubmit = async (credentails, action) => {
    action.setSubmitting(true);

    try {
      const { data } = await authService.post('/signin', credentails);
      authenticate(data);
      history.push('/inbox');
    } catch (error) {
      action.setSubmitting(false);
      // error handling
      action.setErrors({ general: 'invalid username or password' });
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ isValid, isSubmitting, errors }) => (
          <Form className="ui form">
            <Input label="Username" type="text" id="username" name="username" />
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
            />

            <button
              className="ui submit button primary"
              type="submit"
              disabled={!isValid || isSubmitting}>
              Submit
            </button>

            {errors.general && (
              <div style={{ marginTop: '12px' }}>
                <div className="ui red basic label">{errors.general}</div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
