import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import authService from '../apis/auth';
import { UserContext } from '../context/UserContext';

import Input from '../components/Shared/Input';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

class Signin extends Component {
  initialValues = { username: '', password: '' };

  static contextType = UserContext;

  onSubmitClick = async (credentails, action) => {
    action.setSubmitting(true);

    try {
      const { data } = await authService.post('/signin', credentails);
      
      this.context.authenticate(data);
      this.props.history.push('/inbox');
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
          onSubmit={this.onSubmitClick}>
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
