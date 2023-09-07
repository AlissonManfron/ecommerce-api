import express from 'express';
import userRoutes from './app/routes/user-routes.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); 
});

app.use('/api/users', userRoutes);
//app.use('/api/products', product);

app.listen(PORT, () => {
    console.log("Server connected!")
});