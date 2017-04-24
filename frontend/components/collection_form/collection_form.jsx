import React from 'react';
import { Link, hashHistory } from 'react-router';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.collection) {
      this.state = {
        title: this.props.collection.title,
        description: this.props.collection.description,
      };
    } else {
      this.state = {
        title: '',
        description: '',
      };
    }
  }

  componentDidMount() {
    const id = this.props.collectionId;
    if (id && this.props.collection === undefined) {
      this.props.fetchCollection(id).then(
        (response) => {
          this.setState({
            title: response.collection.title,
            description: response.collection.description
          });
        }
      );
    }
  }

  render() {
    let tempHeader;
    if (this.props.collectionId) {
      tempHeader = `edit collection ${this.props.collectionId}`;
    } else {
      tempHeader = 'add collection';
    }
    return (
      <div>
        <h1>{ tempHeader }</h1>
        <p>{ this.state.title === '' ? 'Untitled Collection' : this.state.title }</p>
        <p>by { this.props.currentUser.username }</p>
        <input placeholder='collection name' type='text' value= { this.state.title } />
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.state.description } />
      </div>
    );
  }
}

export default CollectionForm;
