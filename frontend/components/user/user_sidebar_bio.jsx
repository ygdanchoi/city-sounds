import React from 'react';

const UserSidebarBio = (props) => {
  let bio = <p className='user-sidebar-bio'>{ props.bioFromProps }</p>;
  if (props.ownProfile) {
    if (props.editingBio) {
      bio = (
        <div className='user-sidebar-bio'>
          <input
            onChange={ props.handleChange }
            value={ props.bioFromState } />
          <button
            onClick={ props.handleSaveBio }>save</button>
          <a href=''
            onClick={ props.handleCancelBio }>cancel</a>
        </div>
      );
    } else {
      bio = (
        <div className='user-sidebar-bio'>
          { bio }
          <a className='user-sidebar-edit-bio' href=''
            onClick={ props.handleOpenForm }>edit bio</a>
        </div>
      );
    }
  }
  return bio;
};

export default UserSidebarBio;
