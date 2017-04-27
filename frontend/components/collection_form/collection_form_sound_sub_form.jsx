import React from 'react';

class CollectionFormSoundSubForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formProps = {
      title: this.props.title,
      description: this.props.description,
      idx: this.props.idx,
      handleChange: this.props.handleChange,
    };
    return (
      <div>
        <input className='sub-form-title-input' type='text' placeholder=' track name' value={ this.props.title } onChange={ this.props.handleChange('title', formProps) } />
        <div className='sub-form-divider' />
        <label className='sub-form-field-label' htmlFor={`description-${this.props.idx}`}>description</label>
        <textarea id={`description-${this.props.idx}`} className='sub-form-field' value={ this.props.description ? this.props.description : '' } onChange={ this.props.handleChange('description', formProps) } />
      </div>
    );
  }
}

export default CollectionFormSoundSubForm;
