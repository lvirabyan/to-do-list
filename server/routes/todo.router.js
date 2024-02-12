import express from "express";
import todoController from "../controllers/todo.controller.js";


const router = express.Router();
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.delete('/:id', todoController.deleteTodo);
router.delete('/', todoController.deleteAllTodos);
router.patch('/:id', todoController.updateTodo);

export default router;