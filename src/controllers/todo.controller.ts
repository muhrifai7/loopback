import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Todo} from '../models';
import {TodoRepository} from '../repositories';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @post('/todos', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodo',
            exclude: ['id'],
          }),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  @get('/todos/count', {
    responses: {
      '200': {
        description: 'Todo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todoRepository.count(where);
  }
  // ==============================
  @get('/todos/{id}/todoList', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async todoList(@param.path.number('id') id: number): Promise<Todo> {
    return await this.todoRepository.findById(id);
  }
  // ===================================

  @get('/todos', {
    responses: {
      '200': {
        description: 'Array of Todo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Todo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Todo))
    filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return this.todoRepository.find(filter);
  }

  @patch('/todos', {
    responses: {
      '200': {
        description: 'Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Todo,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(todo, where);
  }

  @get('/todos/{id}', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Todo> {
    return this.todoRepository.findById(id);
  }

  @patch('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PATCH success',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Todo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Todo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @put('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<void> {
    await this.todoRepository.replaceById(id, todo);
  }

  @del('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}
