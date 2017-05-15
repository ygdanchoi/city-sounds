import React from 'react';

const UserSidebarBio = (props) => {
  let bio = <p className='user-sidebar-bio'>{ props.bioFromProps }</p>;
  const maxChars = 400;
  let charsLeft;
  if (props.bioFromState) {
    charsLeft = maxChars - props.bioFromState.length;
  } else {
    charsLeft = maxChars;
  }
  let saveButton;
  if (charsLeft >= 0) {
    saveButton = (
      <button
        className='user-sidebar-bio-save'
        onClick={ props.handleSaveBio }>save</button>
    );
    charsLeft = (
      <div className='user-sidebar-chars-left'><p>{ charsLeft } characters left</p></div>
    );
  } else {
    saveButton = (
      <button
        className='user-sidebar-bio-save user-sidebar-save-disabled'>save</button>
    );
    charsLeft = (
      <div className='user-sidebar-chars-left user-sidebar-chars-red'><p>{ charsLeft } characters left</p></div>
    );
  }
  if (props.ownProfile) {
    if (props.editingBio) {
      bio = (
        <div className='user-sidebar-bio'>
          <textarea
            className='user-sidebar-bio-input'
            onChange={ props.handleChange }
            value={ props.bioFromState } />
          { charsLeft }
          { saveButton }
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
