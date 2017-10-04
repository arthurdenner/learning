import React, { Component } from 'react';
import List from './List';

class App extends Component {
  state = {
    term: '',
    items: [],
  };

  onChange = ({ target: { value } }) =>
    this.setState({
      term: value,
    });

  onSubmit = event => {
    event.preventDefault();

    const { items, term } = this.state;

    this.setState({
      term: '',
      items: items.concat(term),
    });
  };

  render() {
    const { items, term } = this.state;

    return (
      <div style={{ padding: '1em' }}>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={term} />
          <button type="submit" style={{ marginLeft: '1em' }}>
            Submit
          </button>
        </form>
        <List items={items} />
      </div>
    );
  }
}

export default App;
