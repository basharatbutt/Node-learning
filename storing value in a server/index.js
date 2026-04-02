const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Ali", class: "Web Dev" }
];

app.get('/students', (req, res) => {
       res.status(200).json(students);
});

app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1, // Simple way to generate an ID
        name: req.body.name,
        class: req.body.class
    };
    students.push(newStudent);
    res.status(201).send(`Student added with ID: ${newStudent.id}`);
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        // Update the name and class with the data sent in the request body
        students[studentIndex].name = req.body.name;
        students[studentIndex].class = req.body.class;
        
        res.send(`Student with ID ${studentId} has been updated.`);
    } else {
        res.status(404).send("Student not found!");
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});