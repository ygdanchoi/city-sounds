import React from 'react';

class CollectionFormSoundSubForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formProps = {
      title: this.props.title,
      duration: this.props.duration,
      idx: this.props.idx,
      handleChange: this.props.handleChange,
    };
    return (
      <div>
        <input type='text' placeholder='track name' value={ this.props.title } onChange={ this.props.handleChange('title', formProps) } />
        <label htmlFor={`duration-${this.props.idx}`}>duration</label>
        <input type='number' id={`duration-${this.props.idx}`} value={ this.props.duration } onChange={ this.props.handleChange('duration', formProps) } />
      </div>
    );
  }
}

export default CollectionFormSoundSubForm;