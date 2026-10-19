
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Shared student data
let students = [
    { id: 1, name: "Deepak", department: "CSE" },
    { id: 2, name: "Arun", department: "CSE" },
    { id: 3, name: "Priya", department: "IT" }
];

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to my REST API!");
});

// GET: All students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// GET: Student by ID
app.get("/api/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST: Add student
app.post("/api/students", (req, res) => {
    const { name, department } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof department !== "string" || !department.trim()
    ) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    const newStudent = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name: name.trim(),
        department: department.trim()
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT: Update student
app.put("/api/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, department } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof department !== "string" || !department.trim()
    ) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    student.name = name.trim();
    student.department = department.trim();

    res.json({
        message: "Student updated successfully",
        student
    });
});

// DELETE: Remove student
app.delete("/api/students/:id", (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
