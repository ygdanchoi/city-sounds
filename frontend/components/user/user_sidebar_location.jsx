import React from 'react';

const UserSidebarLocation = (props) => {
  let location = <p className='user-sidebar-location'>{ props.locationFromProps }</p>;
    if (props.ownProfile) {
      if (props.editingLocation) {
        location = (
          <div className='user-sidebar-location'>
            <input
              onChange={ props.handleChange }
              value={ props.locationFromState } />
            <button
              onClick={ props.handleSaveLocation }>save</button>
            <a href=''
              onClick={ props.handleCancelLocation }>cancel</a>
          </div>
        );
      } else {
        location = (
          <div className='user-sidebar-location'>
            { location }
            <a className='user-sidebar-edit-location' href=''
              onClick={ props.handleOpenForm }>edit location</a>
          </div>
        );
      }
    }
  return location;
};

export default UserSidebarLocation;
