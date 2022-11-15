import React from 'react';

export const Entries = ( { entries } ) => {
    if (entries.length === 0) {
        return <p>There are no entries</p>;
    }
    const EachEntry = ( entry, index) => {
        return (
            <div key={index} className="row">
                <p>{entry.TextEntry}</p>
            </div>
        );
    };

    const entryList = entries.map((entry, index) => EachEntry(entry, index));

    return (
        <div className='container'>
            <h4>Recent Entries</h4>
            {entryList}
        </div>
    );
};