import { Repository } from "typeorm";
import { Todo } from "../entities/todo.entity";

// Start Todo Repository Interface

export interface TodoRepository extends Repository<Todo> {
    this : Repository<Todo>;
}

// End Todo Repository Interface

// Start Implementation Of Custom Todo Repository

export const CustomTodoRepository : Pick<TodoRepository, any> = {

    // Todo Entity Custom Methods 
};

// End Implementation Of Custom Todo Repository