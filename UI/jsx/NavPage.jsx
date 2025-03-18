import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import Counter from './Counter.jsx';

const NotFound = () => <h1>Page Not Found</h1>;
const IssueReport = () => <h1>This is my report page</h1>;
const Home = () => <h1>This is my home page</h1>;
const EditIssue = () => <h1>This is my edit page</h1>;

export default function Contents() {
    return (
        <>
            <Link to="/issues">IssueList | </Link>
            <Link to="/report">Report | </Link>
            <Link to="/Edit/123">Edit123 | </Link>
            <Link to="/issues/123/new">IssueList123new | </Link>
            <Link to="/counter">counter </Link>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/issues" element={<IssueList />} />
                <Route path="/issues/:id" element={<IssueList page={2}/>} />
                <Route path="/Edit/:id" element={<EditIssue page={2}/>} />
                <Route path="/issues/:id/:status" element={<IssueList page={3}/>} />
                <Route path="/report" element={<IssueReport />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
