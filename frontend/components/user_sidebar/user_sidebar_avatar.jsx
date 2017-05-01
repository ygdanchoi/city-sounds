import React from 'react';

class UserSidebarAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickFile = this.handleClickFile.bind(this);
  }

  handleClickFile(e) {
    e.preventDefault();
    this.fileInput.click();
  }

  render() {
    let avatar;
    const avatarMissing = this.props.avatarUrl === '/avatars/original/missing.png';
    if (avatarMissing) {
      avatar = <img style={ { display: 'none' } } />;
    } else {
      avatar = <img className='user-sidebar-avatar' src={ this.props.avatarUrl } />;
    }
    if (this.props.ownProfile) {
      if (avatarMissing) {
        avatar = (
          <div className='user-sidebar-avatar-missing'>
            <input id='file-input' type='file'
              onChange={ this.props.handleAddAvatar }
              style={ { display: 'none' } }
              ref={c => this.fileInput = c } />
            <a href='' onClick={ this.handleClickFile }>add photo</a>
          </div>
        );
      } else {
        avatar = (
          <div className='user-sidebar-avatar-container'>
            { avatar }
            <div className='user-sidebar-avatar-delete' >
              <a href='' onClick={ this.props.handleDeleteAvatar }>X</a>
            </div>
          </div>
        );
      }
    }
    return avatar;
  }
}

export default UserSidebarAvatar;
