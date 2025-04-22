const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.routes')
const captainRoutes=require('./routes/captain.routes')
const mapsRoutes=require('./routes/maps.routes')
const rideRoutes=require('./routes/rides.routes');

const connectToDB=require('./db/db')
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use('/users',userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes);


app.get('/',(req,res)=>{
    res.send("hello")
})
module.exports=app;

