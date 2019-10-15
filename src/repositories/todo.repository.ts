import {DefaultCrudRepository} from '@loopback/repository';
import {Todo, TodoRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Todo, dataSource);
  }
}

// BelongsToAccessor
// import {
//   DefaultCrudRepository,
//   juggler,
//   repository,
//   BelongsToAccessor,
// } from '@loopback/repository';
// import {Todo, TodoRelations, TodoList} from '../models';
// import {inject, Getter} from '@loopback/core';
// import {TodoListRepository} from './todo-list.repository';

// export class TodoRepository extends DefaultCrudRepository<
//   Todo,
//   typeof Todo.prototype.id,
//   TodoRelations
// > {
//   public readonly todoList: BelongsToAccessor<
//     TodoList,
//     typeof Todo.prototype.id
//   >;
//   constructor(
//     @inject('datasources.db') dataSource: juggler.DataSource,
//     @repository.getter(TodoListRepository)
//     protected TodoListRepositoryGetter: Getter<TodoListRepository>,
//   ) {
//     super(Todo, dataSource);
//     this.todoList = this.createBelongsToAccessorFor(
//       'todoList',
//       TodoListRepositoryGetter,
//     );
//     this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
//   }
// }

// BelongsToAccessor
