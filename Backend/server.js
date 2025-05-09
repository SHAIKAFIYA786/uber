const http=require('http');
const app=require('./app');
const port=process.env.PORT||4000;
const { initializeSocket } = require('./socket');

const server=http.createServer(app);
initializeSocket(server);
// dynamically we have to get the port number for production
server.listen(port,()=>{
    console.log(`🚀 Server running on http://localhost:${port}`);
})