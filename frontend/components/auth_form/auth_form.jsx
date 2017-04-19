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
      usernameErrors = 'Username ' + this.props.errors.username.join(', ');
    }
    if (this.props.errors.password) {
      passwordErrors = 'Password ' + this.props.errors.password.join(', ');
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
            <h3 className='auth-form-heading'>{ headingText }</h3>
            <section className='auth-form-section'>
              <form onSubmit={ this.handleSubmit }>
                <div className='auth-form-username'>
                  <label for='auth-form-username-input'>Username</label>
                  <input id='auth-form-username-input'
                    type='text'
                    value={ this.state.username }
                    onChange={ this.handleChange('username') } />
                </div>
                <p className='auth-form-errors'>{ usernameErrors }</p>
                <div className='auth-form-password'>
                  <label for='auth-form-password-input'>Password</label>
                  <input id='auth-form-password-input'
                    type='password'
                    value={ this.state.password }
                    onChange={ this.handleChange('password') } />
                </div>
                <p className='auth-form-errors'>{ passwordErrors }</p>
                <p className='auth-form-errors'>{ baseErrors }</p>
                <div className='auth-form-submit'>
                  <input id='auth-form-submit-input'
                    type='submit'
                    value={ buttonText } />
                </div>
              </form>
            </section>
            <p className='auth-form-bottom'>{ bottomText }{ bottomLink }.</p>
          </section>
        </div>
      </div>
    );
  }
}

export default AuthForm;
