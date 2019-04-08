import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

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
    this.toggleInput(e);
  };

  toggleInput = e => {
    if (e.target.tagName === 'INPUT' && e.key !== 'Enter') return;
    this.setState(state => ({...state, displayed: !state.displayed}));
  };

  render() {
    if (!this.node) {
      this.node = document.createElement('div');
      this.node.onclick = this.toggleInput;
      document.body.appendChild(this.node);
    }
    this.node.className = cn('CatInput-overlay', {
      'CatInput-overlay-displayed': this.state.displayed,
    });
    return (
      <Fragment>
        <button className="CatInput-button" onClick={this.toggleInput}>
          Add cat
        </button>
        {ReactDOM.createPortal(
          <input
            className="CatInput-input"
            type="text"
            onChange={this.onChange}
            value={this.state.value}
            onKeyPress={this.addCat}
          />,
          this.node,
        )}
      </Fragment>
    );
  }
}
