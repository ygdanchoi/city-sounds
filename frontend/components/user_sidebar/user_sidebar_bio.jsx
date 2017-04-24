import React from 'react';

const UserSidebarBio = (props) => {
  let bio = <p className='user-sidebar-bio'>{ props.bioFromProps }</p>;
  if (props.ownProfile) {
    if (props.editingBio) {
      bio = (
        <div className='user-sidebar-bio'>
          <textarea
            className='user-sidebar-bio-input'
            onChange={ props.handleChange }
            value={ props.bioFromState } />
          <button
            className='user-sidebar-bio-save'
            onClick={ props.handleSaveBio }>save</button>
          <button
            className='user-sidebar-bio-cancel'
            onClick={ props.handleCancelBio }>cancel</button>
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
