const express = require('express');
const myContenedor = require('./database');


const app = express();

const indexRandom = (min, max)=>{
    let i = Math.random() * (max - min) + min;
    return Math.floor(i);
}

app.get('/',(req,res)=>{
    res.json({msg: "Index page"});
});

app.get('/productos',async(req,res)=>{
    try {
        
        res.json(await myContenedor.getAll());
    } catch (error) {
        res.status(404).json({msg: "products not found"});
    }
});

app.get('/productoRandom',async(req,res)=>{
    try {
        const products = await myContenedor.getAll();
        const index = indexRandom(1,products.length);
        res.json({msg: `product random ${index}`,
        product: products[index]
    });
    } catch (error) {
        
    }
});


module.exports = app;