import React from 'react';

type TableType = {
};

const Table: React.FC<TableType> = ({children}) => (
    <table>
        {children}
    </table>
);

export default Table;
