import React from 'react';

export default class IssueTable extends React.Component {
    render() {
        console.log("Rendering IssueTable with issues:", this.props.issues); // 确保数据传入
        const rowStyle = { border: "1px solid black", padding: 5 };
        const { issues = [] } = this.props;
        const rows = issues.map((issue) => (
            <IssueRow key={issue.id} issue={issue} rowStyle={rowStyle} />
        ));
        return (
            <table>
                <thead>
                    <tr>
                        <th style={rowStyle}>Id</th>
                        <th style={rowStyle}>Title</th>
                        <th style={rowStyle}>Owner</th>
                        <th style={rowStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class IssueRow extends React.Component {
    render() {
        const { issue, rowStyle } = this.props;
        return (
            <tr>
                <td style={rowStyle}>{issue.id}</td>
                <td style={rowStyle}>{issue.title}</td>
                <td style={rowStyle}>{issue.owner}</td>
                <td style={rowStyle}>{issue.status}</td>
            </tr>
        );
    }
}