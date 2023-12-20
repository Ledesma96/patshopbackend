import  express  from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import ProductsModel from "./DAO/mongo/models/products.model.js";
import cartRouter from "./routes/carts.router.js"
import userRouter from "./routes/user.router.js"
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import MongoStore from "connect-mongo"
import session from "express-session";


const url = "mongodb+srv://gabrielmledesma96:Lolalaloca1@cluster0.a4qufb6.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8080

const app = express();
//permiso para las rutas
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    next();
});


app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/static', express.static('public'));

app.use(session({
  store: MongoStore.create({
    mongoUrl: url,
    dbName: "PetShop",
    mongoOptions:{
      useNewUrlParser: true,
      useUnifiedTopology:true
    },  
    ttl: 1000
  }),
  secret: "secret",
  resave:false,
  saveUninitialized:false
}))

//passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/session", userRouter)


mongoose.connect(url, {
    dbName: "PetShop"
})
.then(() => {
    console.log("DB connected!!");

    const httpServer = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    })

    const io = new Server(httpServer, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        },
      });

    io.on("connection", async socket => {
        console.log("Cliente conectado");
        socket.on("text", async data => {
            const searchItem = data.trim(); 
            if (searchItem === "") {
              io.emit("search", []); 
            } else {
              const regex = new RegExp(`^${searchItem}`, "i");
            
              try {
                const searchProduct = await ProductsModel.find({ name: regex }).lean().exec();
                console.log(searchProduct);
                io.emit("search", searchProduct);
              } catch (error) {
                console.error("Error al buscar productos:", error);
              }
            }
          });
    })
})
.catch (e => {
    console.log("can´t connect to DB");
  })