import React, { Component } from 'react';
import Row from './Row';

import './Table.css';

class Table extends Component {
  state = {}

  render() {
    let { columns, rows, onClick } = this.props;

    return (
      <table className="fixed_header">
        <thead>
          <tr>
            {columns.map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => <Row key={i} row={row} onClick={onClick} />)}
        </tbody>
      </table>
    );
  }
}

export default Table;