import React from 'react';

const Row = ({ row, onClick }) => (
  <tr onClick={() => onClick(row)}>
    {row.map((item, index) => <td key={index}>{item.value}</td>)}
  </tr>
)

export default Row;