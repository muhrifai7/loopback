import {repository, Filter} from '@loopback/repository';
import {TodoListRepository} from '../repositories';
import {post, param, requestBody, getModelSchemaRef, get} from '@loopback/rest';
import {Todo} from '../models';

export class TodoListTodoController {
  constructor(
    @repository(TodoListRepository) protected todoListRepo: TodoListRepository,
  ) {}

  @post('/todo-lists/{id}/todos')
  async create(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {title: 'NewTodo', exclude: ['id']}),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ) {
    return this.todoListRepo.todos(id).create(todo);
  }
  // @get('/todo-lists/{id}/todos', {
  //   responses: {
  //     '200': {
  //       description: "Array of Todo's belonging to TodoList",
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(Todo)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.path.number('id') id: number,
  //   @param.query.object('filter') filter?: Filter<Todo>,
  // ): Promise<Todo[]> {
  //   return this.todoListRepo.todos(id).find(filter);
  // }
}
