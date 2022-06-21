const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const recycledItems = [
   {   
        id: 1, name: 'Rubber bottle', 
        recyclable: true, description: 'Plastic bottle',
        quantity: 100, pricePerUnit: 2
    },
   { 
        id: 2, name: 'Can', recyclable: true, 
        description: 'Aluminium bottle', 
        quantity: 50, pricePerUnit: 1
    },
   { 
        id: 3, name: 'Cardboard', 
        recyclable: true, description: 'Paper', 
        quantity: 10, pricePerUnit: 5
    },
   { 
        id: 4, name: 'Plastic Cups',
        recyclable: true,
        description: 'Plastic materials',
        quantity: 20, pricePerUnit: 6
    },
];

app.get('/', (req, res) =>{
    res.send('<h1>Welcome to our Recycle API</h1>')
});

app.get('/api/itemsIntake', (req, res) =>{
    res.send(recycledItems);
});

//Get specific movie

app.get('/api/itemsIntake/:id', (req, res) =>{
    const recycledItem = recycledItems.find(i => i.id === parseInt(req.params.id));
    if(!recycledItem) res.status(404).send('The recycledItem with the given ID was not found');
    res.send(recycledItem);
});
app.post('/api/itemsIntake', (req, res) =>{
    const { error } = validateIntake(req.body);
    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const recycledItem ={
        id: recycledItems.length + 1,
        name: req.body.name,
        recyclable: req.body.recyclable,
        description: req.body.description,
        quantity: req.body.quantity,
        pricePerUnit: req.body.pricePerUnit
        
    };

    recycledItems.push(recycledItem);
    res.send(recycledItem);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}...`));

function validateIntake(recycledItem){
    const schema = {
        name: Joi.string().min(2).required(),
        recyclable: Joi.boolean(),
        description: Joi.string().min(3).required(),
        quantity: Joi.number(),
        pricePerUnit: Joi.number()
    };
    return Joi.validate(recycledItem, schema);
}

