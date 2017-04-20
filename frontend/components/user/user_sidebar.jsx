import React from 'react';
import { Link } from 'react-router';

class UserSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.deleteAvatarHandler = this.deleteAvatarHandler.bind(this);
    this.editLocationHandler = this.editLocationHandler.bind(this);
    this.editBioHandler = this.editBioHandler.bind(this);
  }

  deleteAvatarHandler(e) {
    e.preventDefault();
  }

  editLocationHandler(e) {
    e.preventDefault();
  }

  editBioHandler(e) {
    e.preventDefault();
  }

  render() {
    const ownProfile = this.props.user.id === this.props.currentUserId;
    let deleteAvatar = null;
    let editLocation = null;
    let editBio = null;
    if (ownProfile) {
      deleteAvatar = <a href='' onClick={ this.deleteAvatarHandler }>x</a>;
      editLocation = <a href='' onClick={ this.editLocationHandler }>edit location</a>;
      editBio = <a href='' onClick={ this.editBioHandler }>edit bio</a>;
    }
    return(
      <aside>
        <img src={ this.props.user.avatarUrl } />
        { deleteAvatar }
        <p>{ this.props.user.username }</p>
        <p>{ this.props.user.location }</p>
        { editLocation }
        <p>{ this.props.user.bio }</p>
        { editBio }
      </aside>
    );
  }
}

export default UserSidebar;
