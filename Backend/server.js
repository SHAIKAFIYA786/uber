const http=require('http');
const app=require('./app');
const port=process.env.PORT||5000

const server=http.createServer(app);
// dynamically we have to get the port number for production
server.listen(port,()=>{
    console.log(`Working on port ${port}`)
})