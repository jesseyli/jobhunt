import React, { Component } from 'react';

import MultiPartForm from './components/MultiPartForm';
import Table from './components/Table';

import { pages } from './resources/FormDetails';

import Modal from './components/Modal';

class App extends Component {
  state = {
    rows: [
      [{ name: "firstName", type: "text", required: true, value: "Phillip" }, { name: "lastName", type: "text", required: true, value: "Ngo" }, { name: "city", type: "text", required: true, value: "Westminster" }, { name: "state", type: "text", required: true, value: "CA" }]
    ],
    show: false
  }

  showModal = () => this.setState({ show: true })

  hideModal = () => this.setState({ show: false })

  render() {
    return (
      <div>
        <Table
          columns={['Posting Link', 'Job Title', 'Company Name', 'Position Level', 'Description', 'Requirements', 'Salary Range', 'Next Follow-up Date', 'Recruiter Name', 'Recruiter Email', 'Recruiter Phone']}
          rows={this.state.rows}
          accessor="value"
          onClick={row => console.log("CLICKED:", row)}
        />
        <button onClick={this.showModal}>Add Job</button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <MultiPartForm
            submit={result => this.setState({ rows: [...this.state.rows, result], show: false })}
            pages={pages}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
