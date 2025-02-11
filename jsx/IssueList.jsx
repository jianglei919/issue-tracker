class IssueFilter extends React.Component {
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

class IssueTable extends React.Component {
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

class IssueAdd extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
        };
        this.props.insertIssue(issue);
        form.owner.value = '';
        form.title.value = '';
    };

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="owner" placeholder="Owner" />
                <input type="submit" value="Add Issue" />
            </form>
        );
    }
}

class IssueList extends React.Component {
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

    //  createIssue = (newIssue) => {
    //     const updatedIssues = [...this.state.issues];
    //     newIssue.id = updatedIssues.length + 1; 
    //     updatedIssues.push(newIssue);
    //     this.setState({ issues: updatedIssues });
    // };
 
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

ReactDOM.render(<IssueList />, document.getElementById('root'));
