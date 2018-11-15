import React from 'react';

const Row = ({ row, onClick, accessor }) => (
  <tr onClick={() => onClick(row)}>
    {row.map((item, index) => <td key={index}>{item[accessor]}</td>)}
  </tr>
)

export default Row;