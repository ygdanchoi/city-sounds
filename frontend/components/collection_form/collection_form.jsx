import React from 'react';
import { Link, hashHistory } from 'react-router';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.collectionId;
    if (id) {
      this.props.fetchCollection(this.props.collectionId);
    }
  }

  render() {
    let collection;
    if (this.props.collectionId) {
      collection = this.props.collectionId;
    } else {
      collection = 'add';
    }
    return (
      <div>
        <h1>{ collection }</h1>
      </div>
    );
  }
}

export default CollectionForm;
