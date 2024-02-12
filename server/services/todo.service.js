import Todo from "../midels/todo.model.js";

class todoService {

    async getTodos() {
        try {
            const todos = await Todo.find();
            return todos;
        } catch (error) {
            console.log(error);
        } 
    }

    async createTodo(todo, disabled) {
        try {
            const newTodo = new Todo({ todo, disabled });
            await newTodo.save();
            return newTodo;
        } catch (error) {
            console.log(error);
        }
    }

    async updateTodo(id, todo, disabled) {
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(id, { todo, disabled }, { new: true });
            return updatedTodo;
        } catch (error) {
            console.log(error);
        }
        
    }
    async deleteTodo(id) {
        try {
            const deletedTodo = await Todo.findByIdAndDelete(id);
            return deletedTodo;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllTodos () {
        try {
            const deletedTodos = await Todo.deleteMany();
            return deletedTodos;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new todoService();