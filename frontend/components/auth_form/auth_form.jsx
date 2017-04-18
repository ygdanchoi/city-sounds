import React from 'react';
import { Link, hashHistory } from 'react-router';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = { user: this.state };
    this.props.processForm(user).then(
      () => this.redirect()
    );
  }

  redirect() {
    hashHistory.push('/');
  }

  render() {
    let headerText;
    let buttonText;
    let footerText;
    if (this.props.formType === 'login') {
      headerText = 'Log in';
      buttonText = 'Log in';
      footerText = <p>Don't have an account? <Link to='/signup'>Sign up</Link>.</p>;
    } else if (this.props.formType === 'signup') {
      headerText = 'Sign up for an account';
      buttonText = 'Sign up';
      footerText = <p>Already have an account? <Link to='/login'>Log in</Link>.</p>;
    }
    return (
      <div>
        <h4>{ headerText }</h4>
        <form onSubmit={ this.handleSubmit }>
          <label>Username
            <input
              type='text'
              value={ this.state.username }
              onChange={ this.handleChange('username') } />
          </label>
          <br />
          <label>Password
            <input
              type='password'
              value={ this.state.password }
              onChange={ this.handleChange('password') } />
          </label>
          <br />
          <input type='submit' value={ buttonText } />
        </form>
        { footerText }
      </div>
    );
  }
}

export default AuthForm;
