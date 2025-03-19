import express from 'express'
import 'dotenv/config' 

const app= express();
app.use(express.json());


app.get('/', (req, res)=>{
    console.log("hello");
    res.send("hello");
})

// * Routes file
import routes from './routes/index.js'
app.use(routes);


const port = process.env.PORT||3000;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})