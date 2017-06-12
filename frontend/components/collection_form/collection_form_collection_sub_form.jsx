import React from 'react';

class CollectionFormCollectionSubForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickArtwork = this.handleClickArtwork.bind(this);
  }

  handleClickArtwork(e) {
    e.preventDefault();
    this.artworkInput.click();
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
            style={ { display: 'none' } }
            ref={c => this.artworkInput = c } />
          <a href='' onClick={ this.handleClickArtwork }>Upload Album Art</a>
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
        <textarea id='collection-form-description-input' className='sub-form-field' placeholder='(optional)' value= { this.props.description } onChange={ this.props.handleChange('description') } />
        <label className='sub-form-field-label' htmlFor='collection-form-tags-input'>tags:</label>
        <textarea id='collection-form-tags-input' className='sub-form-field one-line-field' placeholder='comma-separated list of tags' value= { this.props.tags } onChange={ this.props.handleChange('tags') } />
      </div>
    );
  }
}

export default CollectionFormCollectionSubForm;
