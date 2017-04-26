import React from 'react';

class CollectionFormCollectionSubForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let titleErrors = [];
    if (this.props.errors.title) {
      titleErrors = 'Title ' + this.props.errors.title.join(', ');
    }
    let artworkForm;
    const artworkMissing = this.props.artworkUrl === '/avatars/original/missing.png';
    if (artworkMissing) {
      artworkForm = (
        <div className='collection-form-artwork-missing'>
          <input id='artwork-input' type='file'
            onChange={ this.props.handleAddArtwork }
            style={ { display: 'none' } } />
          <a href='' onClick={ this.props.handleClickArtwork }>upload artwork</a>
        </div>
      );
    } else {
      artworkForm = (
        <div className='collection-form-avatar-container'>
          <img style={ { width: '210px', height: '210px' } } src={ this.props.artworkUrl } />
          <div className='collection-form-avatar-delete' >
            <a href='' onClick={ this.props.handleDeleteArtwork }>X</a>
          </div>
        </div>
      );
    }
    return (
      <div>
        <input placeholder='collection name' type='text' value= { this.props.title } onChange={ this.props.handleChangeTitle } />
          { titleErrors }
          { artworkForm }
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.props.description } onChange={ this.props.handleChangeDescription } />
      </div>
    );
  }
}

export default CollectionFormCollectionSubForm;