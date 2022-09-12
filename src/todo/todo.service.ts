import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import * as uuid from 'uuid';
import {v4 as uuidv4} from 'uuid';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoListDto } from './dto/todo.list.dto';
import { TodoEntity } from './entity/todo.entity';
import { toPromise } from '../shared/utils';

import { toTodoDto } from '../shared/mapper';

@Injectable()
export class TodoService {  
    /** 1 */   
    todos: TodoEntity[] = todos;

    async getOneTodo(id: string): Promise<TodoDto> {    
        /** 2 */    
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {      
        /** 3 */       
        throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);    
        }

        /** 4 */     
        return toPromise(toTodoDto(todo));  
    }
    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto>{    
        const { name, description } = todoDto;

        const todo: TodoEntity = {
            id: uuidv4(),
            name,
            description,
        };

    this.todos.push(todo);
    return toPromise(toTodoDto(todo));  
}
}
