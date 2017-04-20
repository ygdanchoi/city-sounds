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
    this.handleSaveForm = this.handleSaveForm.bind(this);
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

  handleSaveForm(field, editingField) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [field]: e.currentTarget.value,
        [editingField]: false
      });
    };
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
    let avatar = [<img src={ this.state.avatarUrl } />];
    const username = <p>{ this.props.user.username }</p>;
    let location = [<p>{ this.state.location }</p>];
    let bio = [<p>{ this.state.bio }</p>];
    if (ownProfile) {
      avatar.push(
        <div>
          <a href='' onClick={ this.handleDeleteAvatar }>x</a>
        </div>
      );
      if (this.state.editingLocation) {
        location = (
          <div>
            <input onChange={ this.handleChange('location') } value={this.state.location} />
            <a href='' onClick={ this.handleSaveForm('location', 'editingLocation') }>save</a>
          </div>
        );
      } else {
        location.push(
          <div>
            <a href='' onClick={ this.handleOpenForm('editingLocation') }>edit location</a>
          </div>
        );
      }
      if (this.state.editingBio) {
        bio = (
          <div>
            <input onChange={ this.handleChange('bio') } value={this.state.bio} />
            <a href='' onClick={ this.handleSaveForm('bio', 'editingBio') }>save</a>
          </div>
        );
      } else {
        bio.push(
          <div>
            <a href='' onClick={ this.handleOpenForm('editingBio') }>edit bio</a>
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
