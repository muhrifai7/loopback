import {Entity, model, property} from '@loopback/repository';

import {hasMany} from '@loopback/repository';
import {Todo, TodoWithRelations} from './todo.model';

@model()
export class TodoList extends Entity {
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
  color?: string;

  @hasMany(() => Todo)
  todos?: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  todos?: TodoWithRelations[];
  // describe navigational properties here
}

export type TodoListWithRelations = TodoList & TodoListRelations;
