import React from 'react';

type TableCellType = {
};

const TableCell: React.FC<TableCellType> = ({children}) => (
    <td>{children}</td>
);

export default TableCell;
