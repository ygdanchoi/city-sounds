import React from 'react';
import { Link, withRouter } from 'react-router';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let headerText;
    let buttonText;
    let footerText;
    if (this.props.formType === 'login') {
      headerText = 'Log in';
      buttonText = 'Log in';
      footerText = "Don't have an account? Sign up.";
    } else if (this.props.formType === 'signup') {
      headerText = 'Sign up for an account';
      buttonText = 'Sign up';
      footerText = "Already have an account? Log in.";
    }
    return (
      <div>
        <h4>{ headerText }</h4>
        <form>
          <label>Username
            <input type="text"></input>
          </label>
          <br />
          <label>Password
            <input type="password"></input>
          </label>
          <br />
          <input type="submit" value={ buttonText } />
        </form>
        <p>{ footerText }</p>
      </div>
    );
  }
}

export default AuthForm;
