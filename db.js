const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb+srv://<password>@cluster0.3vvnl.mongodb.net/IssueTracker';

let db;
async function connectToDb() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB at', dbUrl);
   // initData();
};

async function initData() {
    await db.collection('issues').deleteMany();
    const issuesDB = [{
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2019-01-15'), due: undefined,
        title: 'Error in console when clicking Add',
    }]
    await db.collection('issues').insertMany(issuesDB);
    const count = await db.collection('issues').count();
    console.log('Inserted', count, 'issues');
    await db.collection('issues').createIndex({ id: 1 }, { unique: true });
    await db.collection('issues').createIndex({ status: 1 });
    await db.collection('issues').createIndex({ owner: 1 });
    await db.collection('issues').createIndex({ created: 1 });
}

async function getDbIssues() {
    const issues = await db.collection('issues').find({}).toArray();
    return issues || [];
}

async function insertDBIssue(issue) {
    issue.id = await getNextSequence('Issues');
    issue.created = new Date();
    issue.status = 'New';
    console.log('insertDBIssue issue:', issue);

    const result = await db.collection('issues').insertOne(issue);
    
    if (!result.acknowledged) {
        throw new Error('Failed to insert issue');
    }

    return await db.collection('issues').findOne({ _id: result.insertedId });
}

async function getNextSequence(filedname) {
    const result = await db.collection('counters').findOneAndUpdate(
        { name: filedname },
        { $inc: { counter: 1 } },
        { returnOriginal: false },
    );

    console.log('result:', result);

    return result.counter;
}

module.exports = { connectToDb, getDbIssues, insertDBIssue };