const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
})

// user: dbUser1
// password: jbLaGsVtEwjMBRN2

const users = [
    {id: 1, name: 'rakib', email: 'r@gmail.com'},
    {id: 2, name: 'emon', email: 'e@gmail.com'},
    {id: 3, name: 'siam', email: 's@gmail.com'},
]


const uri = "mongodb+srv://dbUser1:jbLaGsVtEwjMBRN2@cluster0.jbxtt4r.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try{
        const userCollection = client.db('simpleNode').collection('users');
        // const user = {name: 'Rahim', email: 'kr@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result);
    
        app.get('/users', async(req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err))


// app.get('/users', (req, res) => {
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else{
//     res.send(users);
//     }
// })

// app.post('/users', (req, res) => {
//     console.log("Post api called");
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})