import React from 'react';

const TableController = (props) => {
    const { children } = props;

    return (
        <table className="table table-hover table-striped">
            { children }
        </table>
    );
};

export default TableController;
