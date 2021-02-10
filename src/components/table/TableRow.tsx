import React from 'react';

type TableRowType = {
};

const TableRow: React.FC<TableRowType> = ({children}) => (
    <tr>{children}</tr>
);

export default TableRow;
