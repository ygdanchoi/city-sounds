import React from 'react';
import { Link } from 'react-router';

class UserSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: this.props.user.avatarUrl,
      location: this.props.user.location,
      bio: this.props.user.bio,
      editingLocation: false,
      editingBio: false
    };
    this.handleDeleteAvatar = this.handleDeleteAvatar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenForm = this.handleOpenForm.bind(this);
    this.handleSaveLocation = this.handleSaveLocation.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleCancelLocation = this.handleCancelLocation.bind(this);
    this.handleCancelBio = this.handleCancelBio.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.user.avatarUrl !== newProps.user.avatarUrl) {
      this.setState({avatarUrl: newProps.user.avatarUrl});
    }
    if (this.props.user.location !== newProps.user.location) {
      this.setState({location: newProps.user.location});
    }
    if (this.props.user.bio !== newProps.user.bio) {
      this.setState({bio: newProps.user.bio});
    }
  }

  handleDeleteAvatar(e) {
    e.preventDefault();
  }

  handleOpenForm(editingField) {
    return (e) => {
      e.preventDefault();
      this.setState({ [editingField]: true });
    };
  }

  handleSaveLocation(e) {
    e.preventDefault();
    const user = {
      id: this.props.user.id,
      location: this.state.location,
    };
    this.props.updateUser(user);
    this.setState({
      location: e.currentTarget.value,
      editingLocation: false
    });
  }

  handleSaveBio(e) {
    e.preventDefault();
    const user = {
      id: this.props.user.id,
      bio: this.state.bio,
    };
    this.props.updateUser(user);
    this.setState({
      bio: e.currentTarget.value,
      editingBio: false
    });
  }

  handleCancelLocation(e) {
    e.preventDefault();
    this.setState({
      location: this.props.user.location,
      editingLocation: false
    });
  }

  handleCancelBio(e) {
    e.preventDefault();
    this.setState({
      bio: this.props.user.bio,
      editingBio: false
    });
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  render() {
    const ownProfile = this.props.user.id === this.props.currentUserId;
    let avatar = [<img src={ this.props.user.avatarUrl } />];
    const username = <p>{ this.props.user.username }</p>;
    let location = [<p>{ this.props.user.location }</p>];
    let bio = [<p>{ this.props.user.bio }</p>];
    if (ownProfile) {
      avatar.push(
        <div>
          <a href='' onClick={ this.handleDeleteAvatar }>x</a>
        </div>
      );
      if (this.state.editingLocation) {
        location = (
          <div>
            <input
              onChange={ this.handleChange('location') }
              value={this.state.location} />
            <button
              onClick={ this.handleSaveLocation }>save</button>
            <a href=''
              onClick={ this.handleCancelLocation }>cancel</a>
          </div>
        );
      } else {
        location.push(
          <div>
            <a href=''
              onClick={ this.handleOpenForm('editingLocation') }>edit location</a>
          </div>
        );
      }
      if (this.state.editingBio) {
        bio = (
          <div>
            <input
              onChange={ this.handleChange('bio') }
              value={this.state.bio} />
            <button
              onClick={ this.handleSaveBio }>save</button>
            <a href=''
              onClick={ this.handleCancelBio }>cancel</a>
          </div>
        );
      } else {
        bio.push(
          <div>
            <a href=''
              onClick={ this.handleOpenForm('editingBio') }>edit bio</a>
          </div>
        );
      }
    }

    return(
      <aside>
        { avatar }
        { username }
        { location }
        { bio }
      </aside>
    );
  }
}

export default UserSidebar;
