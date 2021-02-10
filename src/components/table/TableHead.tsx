import React from 'react';

type TableHeadType = {
};

const TableHead: React.FC<TableHeadType> = ({children}) => (
    <thead>{children}</thead>
);

export default TableHead;
