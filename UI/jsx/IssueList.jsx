import React from 'react';
import IssueAdd from "./IssueAdd.jsx";
import IssueTable from "./IssueTable.jsx";
import IssueFilter from "./IssueFilter.jsx";

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
                        issueList {
                            id
                            title
                            status
                            owner
                            created
                            effort
                            due
                        }
                    }`;
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const result = await response.json();
        console.log("loadData fetch from graphql: " + result);
        this.setState({ issues: result.data.issueList });
    }
 
    async insertIssue(issue) {
        const query = `
            mutation addIssue($issue: IssueInputs!) {
                addIssue(issue: $issue) {
                    id
                }
            }
        `;

        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { issue } }),
        });

        this.loadData();
    }

    render() {
        console.log("Rendering IssueList with issues:", this.state.issues);
        return (
            <>
                <IssueFilter />
                <IssueTable issues={this.state.issues || []} />
                <IssueAdd insertIssue={this.insertIssue.bind(this)} />
            </>
        );
    }
}
