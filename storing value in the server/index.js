const e = require('express');
const express = require('express');
const app = express();

app.use(express.json());

// 1. Updated Data Structure: Added 'Father' name
let students = [
    { id: 1, Name: "Ali", Class: "Web Dev", Father: "Ahmed" }
];


// 2. GET Route: Portal/list-Students
app.get('/', (req, res) =>{
       res.send("Welcome to student Portal")
})
app.put('/', (req, res) =>{
    
    let studentid = req.body.id;
    let studentName = req.body.Name;
    let studentClass = req.body.Class;
    let studentFather = req.body.Father;
    let searchStudent = students.find(s => s.id == studentid);
    console.log(searchStudent);
    if(searchStudent){
      res.json({
        message: "PUT / is working proper",
         "id": studentid,
        "Name": studentName,
        "Class": studentClass,
        "Father": studentFather,
    });
    }
    else{        res.json({
            message: "PUT / is working",
            message : "Not Avalible"
        });
    }

    
})

app.get('/Portal/list-Students', (req, res) => {
    res.status(200).json(students);
});

// 3. POST Route: Portal/add-student
app.post('/Portal/add-student', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        Name: req.body.Name,   // Capital N to match your request
        Class: req.body.Class, // Capital C to match your request
        Father: req.body.Father // New Field
    };
    
    students.push(newStudent);
    res.status(201).send(`Student ${newStudent.Name} added successfully!`);
});

// 4. PUT Route: Portal/update-student/:id
// Note: We still need the :id so the server knows WHICH student to update
app.put('/Portal/update-student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        // Updating the new fields
        students[studentIndex].Name = req.body.Name;
        students[studentIndex].Class = req.body.Class;
        students[studentIndex].Father = req.body.Father;
        
        res.send(`Student ID ${studentId} updated in the Portal.`);
    } else {
        res.status(404).send("Student not found in our Portal!");
    }
});

app.listen(4000, () => {
    console.log('Portal Server is running on port 3000');
});