import React from 'react';

const UserSidebarAvatar = (props) => {
  let avatar;
  const avatarMissing = props.avatarUrl === '/avatars/original/missing.png';
  if (avatarMissing) {
    avatar = <div><p>add photo</p></div>;
  } else {
    avatar = <img width='120px' src={ props.avatarUrl } />;
  }
  if (props.ownProfile) {
    if (avatarMissing) {
      avatar = (
        <div>
          { avatar }
          <input type='file' onChange={ props.handleAddAvatar } />
        </div>
      );
    } else {
      avatar = (
        <div>
          { avatar }
          <a href='' onClick={ props.handleDeleteAvatar }>x</a>
        </div>
      );
    }
  }
  return avatar;
};

export default UserSidebarAvatar;
