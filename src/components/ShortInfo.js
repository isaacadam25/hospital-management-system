import React from 'react';

const ShortInfo = (props) => {
    const { pendingCount } = props;

    return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Pending Orders
                <span className="badge bg-primary rounded-pill">{pendingCount}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                All
                <span className="badge bg-primary rounded-pill">{pendingCount}</span>
            </li>
        </ul>
    );
};

export default ShortInfo;