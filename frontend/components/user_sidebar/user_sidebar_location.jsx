import React from 'react';

const UserSidebarLocation = (props) => {
  let location = <p className='user-sidebar-location'>{ props.locationFromProps }</p>;
    if (props.ownProfile) {
      if (props.editingLocation) {
        location = (
          <div className='user-sidebar-location'>
            <input
              className='user-sidebar-location-input'
              onChange={ props.handleChange }
              value={ props.locationFromState } />
            <button
              className='user-sidebar-location-save'
              onClick={ props.handleSaveLocation }>save</button>
            <button
              className='user-sidebar-location-cancel'
              onClick={ props.handleCancelLocation }>cancel</button>
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
