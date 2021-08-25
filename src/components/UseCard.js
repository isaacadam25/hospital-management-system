import React from 'react';

const UseCard = (props) => {
    const { count, title } = props;

    return (
        <div className="card">
            <div className="card-body">
                <h1 className="card-title h1">{ count }</h1>
                <h6 className="card-subtitle mb-2 text-muted">{ title }</h6>
            </div>
        </div>
    );
};

export default UseCard;