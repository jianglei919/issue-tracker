import React from 'react';
import IssueAdd from "./IssueAdd.jsx";
import IssueTable from "./IssueTable.jsx";
import IssueFilter from "./IssueFilter.jsx";
import { useLocation, useParams } from 'react-router-dom';

function getParam(Il) {
    return props => <Il {...props} myparam={useParams()} myloc={useLocation()}></Il>
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.getFilter = this.getFilter.bind(this);
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
        const myparamid = this.props.myparam.id;
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: {myparamid} }),
        });
        const result = await response.json();

        // result.data.issueList.forEach(issue => {
        //     issue === this.props.myparam.id;
        // });
        
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

    getFilter() {
        const myl = this.state.issues.slice();
        if (typeof this.props.myparam.id !== 'undefined') {
            const result = myl.filter(issue => issue.id == this.props.myparam.id);
            return result;
        }
        if (typeof this.props.page !== 'undefined') {
            return myl.sort((a, b) => a.id >= b.id?1:-1).slice((Number(this.props.page) * 10) - 10, (Number(this.props.page)));
            // return myl.sort((a, b) => a.id - b.id).slice(0, this.props.myparam.page);
        }
        return myl;
    }

    render() {
        const myList = this.getFilter();
        return (
            <>
                <IssueFilter />
                <IssueTable issues={myList} />
                <IssueAdd insertIssue={this.insertIssue.bind(this)} />
            </>
        );
    }
}

export default getParam(IssueList);
