const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const students =[
    {id: 1, name: 'Tommy Zlahn', course: ['CS 215', 'FSW 125', 'FSW 123'], isAdmin: true, email: 'tommy@zlahn.com', phone: 12345678},
    {id: 2, name: 'William Tubman', course: ['CS 110', 'FSW 100', 'FSW 102'], isAdmin: false, email: 'william@tubman.com', phone: 12345678},
    {id: 3, name: 'Princess Johnson', course: ['CS 201', 'FSW 100', 'FSW 105'], isAdmin: false, email: 'princess@johnson.com', phone: 12345678},
];

//GET Method
app.get('/', (req, res) =>{
    res.send('<h1>Welcome to my app</h1>');

});

app.get('/api/students', (req, res) =>{
    res.send(students);
    
});

//Getting specific student - eg. api/students/1
app.get('/api/students/:id', (req, res) => {
    //res.send(req.params.id);
    const student = students.find(s => s.id === parseInt(req.params.id));
    
    if(!student) res.status(404).send('The student with the given ID does not exist!');
    res.send(student);
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on port ${port}`));
//POST Method 
app.post('/api/students', (req, res) =>{
    const { error } = validateStudent(req.body);
    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const student ={
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        phone: req.body.phone
    };

    students.push(student);
    res.send(student);
});
// Updating record using app.put()
app.put('/api/students/:id', (req, res) =>{
    //Look up the student
    //If not exissting, return 404 - request not found

    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('The student with the given ID does not exist!');

    //Validate
    //If invalid, return 404 - Bad request
    const { error } = validateStudent(req.body);
    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update student
    //return updated student to client
    student.name = req.body.name;
    student.course = req.body.course;
    student.isAdmin = req.body.isAdmin;
    student.email = req.body.email;
    student.phone = req.body.phone;

    res.send(student);



});
// app.delete();
app.delete('/api/students/:id', (req, res) =>{
    //Look up the student
    //If not exissting, return 404 - request not found

    const student = students.find(d => d.id === parseInt(req.params.id));
    if(!student) res.status(404).send('The student with the given ID does not exist!');

    //delete student
    //return updated student to client
    students.remove(student);

    res.send(student);



});

//data validation
function validateStudent(student){
    const schema = {
        name: Joi.string().min(2).required(),
        course: Joi.array(),
        isAdmin: Joi.boolean(),
        email: Joi.string(),
        phone: Joi.number()
    };
    return Joi.validate(student, schema);
}