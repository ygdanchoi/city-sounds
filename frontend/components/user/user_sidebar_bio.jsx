import React from 'react';

const UserSidebarBio = (props) => {
  let bio = <p>{ props.bioFromProps }</p>;
  if (props.ownProfile) {
    if (props.editingBio) {
      bio = (
        <div>
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
        <div>
          { bio }
          <a href=''
            onClick={ props.handleOpenForm }>edit bio</a>
        </div>
      );
    }
  }
  return bio;
};

export default UserSidebarBio;
