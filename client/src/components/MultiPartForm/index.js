import React, { Component } from 'react';
import MegaForm from './MegaForm';

class MultiPartFrom extends Component {
  state = {
    pages: this.props.pages,
    currentPage: 0,
    results: []
  }

  finalSubmit = result => {
    let results = [...this.state.results, ...result];
    this.props.submit(results);
    this.setState({
      results: [],
      currentPage: 0
    })
  }

  changePage = result => {
    let results = [...this.state.results, ...result];
    this.setState({
      results,
      currentPage: this.state.currentPage + 1
    })
  }

  displayPage = () => {
    let { pages, currentPage } = this.state;

    switch (currentPage) {
      case 0:
        return (
          <MegaForm
            submitText="Next"
            submit={this.changePage}
            inputs={pages[currentPage]}
            title="Add a job"
          />
        )
      case 1:
        return (
          <MegaForm
            submitText="Next"
            submit={this.changePage}
            inputs={pages[pages.length - 1]}
            title="Add a location"
          />
        )
      case 2:
        return (
          <MegaForm
            submitText="Submit"
            submit={this.finalSubmit}
            inputs={pages[1]}
            title="Add recruiter information"
          />
        )
      default:
        return
    }
  }

  render() {
    return (
      <div>
        {this.displayPage()}
      </div>
    );
  }
}

export default MultiPartFrom;