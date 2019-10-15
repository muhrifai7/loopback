import {Entity, model, property} from '@loopback/repository';

import {belongsTo} from '@loopback/repository';
import {TodoList, TodoListWithRelations} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplite?: boolean;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  todoList?: TodoListWithRelations;
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
