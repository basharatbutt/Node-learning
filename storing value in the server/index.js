const express = require('express');
const app = express();

app.use(express.json());

// 1. Leave this exactly as it is (Ali)
let students = [
    { id: 1, Name: "Ali", Class: "Web Dev", Father: "Ahmed" }
];

// 2. FIXED GET ROUTE: This now shows the ACTUAL data in the browser
app.get('/', (req, res) =>{
    // We send the array to the browser so we can see the changes
    res.json(students); 
});

// 3. PUT Route: This is the "Remote Control" to change the data in memory
app.put('/', (req, res) =>{
    let studentid = req.body.id;
    let searchStudent = students.find(s => s.id == studentid);

    if(searchStudent){
        // We update the memory here
        searchStudent.Name = req.body.Name;
        searchStudent.Class = req.body.Class;
        searchStudent.Father = req.body.Father;

        res.json({
            message: "Success! Data changed in server memory.",
            new_data: searchStudent
        });
    } else {
        res.status(404).json({ message: "Student Not Found" });
    }
});

// List students route
app.get('/Portal/list-Students', (req, res) => {
    res.status(200).json(students);
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});