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
          <a href='' onClick={ this.props.handleClickArtwork }>Upload Album Art</a>
        </div>
      );
    } else {
      artworkForm = (
        <div className='collection-form-artwork-container'>
          <img src={ this.props.artworkUrl } />
          <div className='collection-form-artwork-delete' >
            <a href='' onClick={ this.props.handleDeleteArtwork }>X</a>
          </div>
        </div>
      );
    }
    return (
      <div>
        <input className='sub-form-title-input' placeholder=' collection name' type='text' value= { this.props.title } onChange={ this.props.handleChange('title') } />
        { titleErrors }
        <div className='sub-form-divider' />
        { artworkForm }
        <div className='sub-form-divider' />
        <label className='sub-form-field-label' htmlFor='collection-form-description-input'>about this collection:</label>
        <textarea id='collection-form-field' className='sub-form-field' placeholder='(optional)' value= { this.props.description } onChange={ this.props.handleChange('description') } />
      </div>
    );
  }
}

export default CollectionFormCollectionSubForm;
