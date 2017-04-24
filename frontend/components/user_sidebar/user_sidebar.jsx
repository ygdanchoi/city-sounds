import React from 'react';
import { Link } from 'react-router';
import UserSidebarAvatar from './user_sidebar_avatar';
import UserSidebarLocation from './user_sidebar_location';
import UserSidebarBio from './user_sidebar_bio';

class UserSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarFile: null,
      avatarUrl: this.props.user.avatarUrl,
      location: this.props.user.location,
      bio: this.props.user.bio,
      editingLocation: false,
      editingBio: false
    };
    this.handleAddAvatar = this.handleAddAvatar.bind(this);
    this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
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
    } else {
      this.setState({avatarUrl: this.props.user.avatarUrl});
    }
    if (this.props.user.location !== newProps.user.location) {
      this.setState({location: newProps.user.location});
    } else {
      this.setState({location: this.props.user.location});
    }
    if (this.props.user.bio !== newProps.user.bio) {
      this.setState({bio: newProps.user.bio});
    } else {
      this.setState({bio: this.props.user.bio});
    }
  }

  handleAddAvatar(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (() => {
      this.setState({
        avatarFile: file,
        avatarUrl: fileReader.result
      });
    }).bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
    this.handleSubmitAvatar(file);
  }

  handleSubmitAvatar(avatarFile) {
    let formData = new FormData();
    formData.append('user[id]', this.props.user.id);
    formData.append('user[avatar]', avatarFile);
    this.props.updateUserAvatar(this.props.user.id, formData);
  }

  handleDeleteAvatar(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('user[id]', this.props.user.id);
    formData.append('user[avatar]', null);
    this.props.updateUserAvatar(this.props.user.id, formData);
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
    return(
      <aside className='user-sidebar'>
        <UserSidebarAvatar
          avatarUrl={ this.state.avatarUrl }
          ownProfile={ this.props.ownProfile }
          handleAddAvatar={ this.handleAddAvatar }
          handleDeleteAvatar={ this.handleDeleteAvatar } />
        <p className='user-sidebar-username'>{ this.props.user.username }</p>
        <UserSidebarLocation
          locationFromProps={ this.props.user.location }
          locationFromState={ this.state.location }
          ownProfile={ this.props.ownProfile }
          editingLocation={ this.state.editingLocation }
          handleChange={ this.handleChange('location') }
          handleSaveLocation={ this.handleSaveLocation }
          handleCancelLocation={ this.handleCancelLocation }
          handleOpenForm={ this.handleOpenForm('editingLocation') }
          />
        <UserSidebarBio
          bioFromProps={ this.props.user.bio }
          bioFromState={ this.state.bio }
          ownProfile={ this.props.ownProfile }
          editingBio={ this.state.editingBio }
          handleChange={ this.handleChange('bio') }
          handleSaveBio={ this.handleSaveBio }
          handleCancelBio={ this.handleCancelBio }
          handleOpenForm={ this.handleOpenForm('editingBio') }
          />
      </aside>
    );
  }
}

export default UserSidebar;
