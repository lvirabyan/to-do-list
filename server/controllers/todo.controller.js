import todoService from "../services/todo.service.js";
class todoController{

    async getTodos(req, res) {
        const todos = await todoService.getTodos();
        res.status(200).json(todos);
    }

    async createTodo(req, res) {
        const { todo, disabled } = req.body;
        const newTodo = await todoService.createTodo(todo, disabled);
        res.status(201).json(newTodo);
    }
    async updateTodo(req, res) {
        const { id } = req.params;
        const { todo, disabled } = req.body;
        const updatedTodo = await todoService.updateTodo(id, todo, disabled);
        res.status(200).json(updatedTodo);
    }
    async deleteTodo(req, res) {
        const { id } = req.params;
        const deletedTodo = await todoService.deleteTodo(id);
        res.status(200).json(deletedTodo);
    }
    async deleteAllTodos(req, res) {
        const deletedTodos = await todoService.deleteAllTodos();
        res.status(200).json(deletedTodos);
    }
}

export default new todoController();