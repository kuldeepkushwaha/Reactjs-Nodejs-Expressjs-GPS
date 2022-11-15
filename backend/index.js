
import express from "express";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UsersRoute from "./routes/UsersRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import GpsDataRoute from "./routes/GpsDataRoute.js";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
     origin: ['https://6372157412789d195b05c2c5--gpsappfront.netlify.app','http://localhost:3000','https://gpsfrontend.herokuapp.com'],
     methods: ['GET', 'POST','DELETE'],
     credentials: true
 }));
(async()=>{
    await db.sync();
})();
const sessionStore=SequelizeStore(expressSession.Store);
const store=new sessionStore({
     db:db
});
app.set('trust proxy', 1)
app.use(expressSession({
     key: "userId",
     secret: "subscribe",
     resave: false,
     saveUninitialized: false,
     cookie:{secure:'auto'}
 })
);
app.use(express.json());
app.use(AuthRoute);
app.use(UsersRoute);
app.use(GpsDataRoute);
store.sync()
const PORT=process.env.PORT || 5000
app.listen(PORT, ()=> {
console.log('Server running at port 5000')
});

