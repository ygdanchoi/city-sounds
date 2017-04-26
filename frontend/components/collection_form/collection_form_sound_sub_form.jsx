import React from 'react';

class CollectionFormSoundSubForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type='text' placeholder='track name' value={ this.props.title } onChange={ this.props.handleChange('title') } />
        <label htmlFor={`duration-${this.props.idx}`}>duration</label>
        <input type='number' id={`duration-${this.props.idx}`} value={ this.props.duration } onChange={ this.props.handleChange('duration') } />
      </div>
    );
  }
}

export default CollectionFormSoundSubForm;