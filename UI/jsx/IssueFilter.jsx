import React from 'react';

export default class IssueFilter extends React.Component {
    render() {
        return (
            <div>
                <h2>This is Issue Filter</h2>
                <input type="text" placeholder="Filter by owner" />
                <input type="submit" value="Filter" />
            </div>
        );
    }
}