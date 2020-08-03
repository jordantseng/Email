import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import authService from '../../apis/auth';
import { connect } from 'react-redux';
import { signUp } from '../../Actions';

import Input from '../../Components/Shared/Input/Input';

let timer = null;
const validateUsername = username => {
  clearTimeout(timer);

  if (!username) {
    return;
  }
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      return authService
        .post('/username', {
          username,
        })
        .then(({ data }) => {
          if (data.available) {
            resolve(true);
          }
        })
        .catch(error => {
          resolve(false);
        });
    }, 500);
  });
};

const validationSchema = yup.object({
  username: yup
    .string()
    .min(4)
    .required()
    .test('checkDuplUsername', 'username alreday exists', value =>
      validateUsername(value)
    ),
  password: yup.string().min(5).required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

class Signup extends Component {
  initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  onFormSubmit = (credentails, action) => {
    action.setSubmitting(true);
    this.props.signUp(credentails);
    // ERROR: CHANGE STATE AFTER COMPONENT UNMOUNTED
    // action.setSubmitting(false);
  };

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <Formik
          initialValues={this.initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onFormSubmit}>
          {({ values, errors, isSubmitting }) => {
            return (
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
                <Input
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                />
                <button
                  className="ui submit button primary"
                  type="submit"
                  disabled={isSubmitting}>
                  Submit
                </button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signUp,
};

export default connect(null, mapDispatchToProps)(Signup);
