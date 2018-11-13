import React, { Component } from 'react';

import MultiPartForm from './components/MultiPartForm';
import Table from './components/Table';

import { pages } from './resources/FormDetails';

class App extends Component {
  state = {
    rows: [
      [{ name: "firstName", type: "text", required: true, value: "Phillip" }, { name: "lastName", type: "text", required: true, value: "Ngo" }, { name: "city", type: "text", required: true, value: "Westminster" }, { name: "state", type: "text", required: true, value: "CA" }]
    ]
  }
  render() {
    return (
      <div>
        <Table
          columns={['first name', 'last name', 'city', 'state']}
          rows={this.state.rows}
          onClick={row => console.log("CLICKED:", row)}
        />
        <MultiPartForm
          submit={result => this.setState({ rows: [...this.state.rows, result] })}
          pages={pages}
        />

      </div>
    );
  }
}

export default App;
