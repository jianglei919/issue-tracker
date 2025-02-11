class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "This is Issue Filter"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Filter by owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Filter"
    }));
  }
}
class IssueTable extends React.Component {
  render() {
    console.log("Rendering IssueTable with issues:", this.props.issues); // 确保数据传入
    const rowStyle = {
      border: "1px solid black",
      padding: 5
    };
    const {
      issues = []
    } = this.props;
    const rows = issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue,
      rowStyle: rowStyle
    }));
    return /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Id"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Title"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Owner"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, rows));
  }
}
class IssueRow extends React.Component {
  render() {
    const {
      issue,
      rowStyle
    } = this.props;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, issue.id), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, issue.title), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, issue.owner), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, issue.status));
  }
}
class IssueAdd extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New'
    };
    this.props.insertIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  };
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Add Issue"
    }));
  }
}
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    console.log("loadData fetch from graphql: " + result);
    this.setState({
      issues: result.data.issueList
    });
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          issue
        }
      })
    });
    this.loadData();
  }
  render() {
    console.log("Rendering IssueList with issues:", this.state.issues);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues || []
    }), /*#__PURE__*/React.createElement(IssueAdd, {
      insertIssue: this.insertIssue.bind(this)
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(IssueList, null), document.getElementById('root'));