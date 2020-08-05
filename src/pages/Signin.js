import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { signIn } from '../actions';

import Input from '../components/Shared/Input';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

// TODO: ERROR HANDLING WHEN ENTERING WRONG PASSWORD
class Signin extends Component {
  initialValues = { username: '', password: '' };

  onSubmit = (credentails, action) => {
    action.setSubmitting(true);
    this.props.signIn(credentails);
    // ERROR: CHANGE STATE AFTER COMPONENT UNMOUNTED
    // action.setSubmitting(false);
  };

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <Formik
          initialValues={this.initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}>
          {({ isSubmitting, values, errors }) => (
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
                disabled={isSubmitting}>
                Submit
              </button>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(Signin);
