import React from 'react';

const UserSidebarLocation = (props) => {
  let location = <p>{ props.locationFromProps }</p>;
    if (props.ownProfile) {
      if (props.editingLocation) {
        location = (
          <div>
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
          <div>
            { location }
            <a href=''
              onClick={ props.handleOpenForm }>edit location</a>
          </div>
        );
      }
    }
  return location;
};

export default UserSidebarLocation;
