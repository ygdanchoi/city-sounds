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

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearErrors();
    }
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
    let headingText;
    let buttonText;
    let bottomText;
    let bottomLink;
    if (this.props.formType === 'login') {
      headingText = 'Log in';
      buttonText = 'Log in';
      bottomText = "Don't have an account? ";
      bottomLink = <Link to='/signup'>Sign up</Link>;
    } else if (this.props.formType === 'signup') {
      headingText = 'Sign up for an account';
      buttonText = 'Sign up';
      bottomText = 'Already have an account? ';
      bottomLink = <Link to='/login'>Log in</Link>;
    }

    let usernameErrors = [];
    let passwordErrors = [];
    let baseErrors = [];
    if (this.props.errors.username) {
      usernameErrors = this.props.errors.username;
    }
    if (this.props.errors.password) {
      passwordErrors = this.props.errors.password;
    }
    if (this.props.errors.base) {
      baseErrors = this.props.errors.base;
    }

    return (
      <div>
        <header className='auth-form-header'>
          <h2>.:.:. citysounds</h2>
        </header>
        <div className='auth-form-body'>
          <section className='auth-form-block'>
            <h4 className='auth-form-heading'>{ headingText }</h4>
            <form onSubmit={ this.handleSubmit }>
              <label>Username
                <input
                  type='text'
                  value={ this.state.username }
                  onChange={ this.handleChange('username') } />
              </label>
              { usernameErrors }
              <br />
              <label>Password
                <input
                  type='password'
                  value={ this.state.password }
                  onChange={ this.handleChange('password') } />
              </label>
              { passwordErrors }
              { baseErrors }
              <br />
              <input type='submit' value={ buttonText } />
            </form>
            <p>{ bottomText }{ bottomLink }.</p>
          </section>
        </div>
      </div>
    );
  }
}

export default AuthForm;
