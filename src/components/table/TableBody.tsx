import React from 'react';

type TableBodyType = {
};

const TableBody: React.FC<TableBodyType> = ({children}) => (
    <tbody>{children}</tbody>
);

export default TableBody;
