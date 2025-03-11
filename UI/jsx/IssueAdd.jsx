import React from "react";

export default class IssueAdd extends React.Component {
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