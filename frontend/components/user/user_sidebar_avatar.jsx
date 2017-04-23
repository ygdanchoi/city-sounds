import React from 'react';

const handleClickFile = (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('file-input');
  fileInput.click();
};

const UserSidebarAvatar = (props) => {
  let avatar;
  const avatarMissing = props.avatarUrl === '/avatars/original/missing.png';
  if (avatarMissing) {
    avatar = <img style={ { display: 'none' } } />;
  } else {
    avatar = <img className='user-sidebar-avatar' src={ props.avatarUrl } />;
  }
  if (props.ownProfile) {
    if (avatarMissing) {
      avatar = (
        <div className='user-sidebar-avatar-missing'>
          <input id='file-input' type='file'
            onChange={ props.handleAddAvatar }
            style={ { display: 'none' } } />
          <a href='' onClick={ handleClickFile }>add photo</a>
        </div>
      );
    } else {
      avatar = (
        <div className='user-sidebar-avatar-container'>
          { avatar }
          <div className='user-sidebar-avatar-delete' >
            <a href='' onClick={ props.handleDeleteAvatar }>X</a>
          </div>
        </div>
      );
    }
  }
  return avatar;
};

export default UserSidebarAvatar;
