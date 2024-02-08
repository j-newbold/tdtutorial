const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

//routes

// create
// get all
// get a
// update a
// delete a

app.post('/todos', async(req, res) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]);
        res.json(newTodo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});

app.get('/todos', async(req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message);
    }
});

app.get('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE tid = $1", [id]);
        res.json(todo.rows);
    } catch(err) {
        console.error(err.message);
    }
});

app.put('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE tid = $2",
        [description, id]);
        res.json("Todo was updated");
    } catch(err) {
        console.error(err.message);
    }
})

app.delete('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const delTodo = await pool.query("DELETE FROM todo WHERE tid = $1",
        [id]);
        res.json("Todo was deleted");
    } catch(err) {
        console.error(err.message);
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});