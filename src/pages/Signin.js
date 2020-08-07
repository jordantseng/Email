import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import authService from '../apis/auth';
import Input from '../components/Shared/Input';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

class Signin extends Component {
  initialValues = { username: '', password: '' };

  onSubmit = async (credentails, action) => {
    const { authenticate, history } = this.props;
    action.setSubmitting(true);

    try {
      const { data } = await authService.post('/signin', credentails);

      authenticate(data);
      history.push('/inbox');
    } catch (error) {
      action.setSubmitting(false);
      action.setErrors({ general: 'invalid username or password' });
    }
  };

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <Formik
          initialValues={this.initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}>
          {({ isValid, isSubmitting, errors }) => (
            <Form className="ui form">
              <Input
                label="Username"
                type="text"
                id="username"
                name="username"
              />
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

              {/* TODO: find a more elegant way to handle entire form error*/}
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
  }
}

export default Signin;
