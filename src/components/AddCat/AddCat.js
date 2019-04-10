import React, {Component, Fragment} from 'react';

import './AddCat.css';

export class AddCat extends Component {
  state = {
    value: '',
    displayed: false,
  };

  onChange = event => {
    this.setState({value: event.target.value});
  };

  addCat = e => {
    if (e.key !== 'Enter') return;
    this.props.addCat(this.state.value);
    this.setState({value: ''});
    this.toggleInput();
  };

  toggleInput = () => {
    this.setState(state => ({...state, displayed: !state.displayed}));
  };

  render() {
    return (
      <Fragment>
        <button className="CatInput-button" onClick={this.toggleInput}>
          Add cat
        </button>
        <div
          onClick={this.toggleInput}
          className={`CatInput-overlay${
            this.state.displayed ? ' CatInput-overlay-displayed' : ''
          }`}>
          <input
            className="CatInput-input"
            type="text"
            onClick={e => e.stopPropagation()}
            onChange={this.onChange}
            value={this.state.value}
            onKeyPress={this.addCat}
          />
        </div>
      </Fragment>
    );
  }
}
