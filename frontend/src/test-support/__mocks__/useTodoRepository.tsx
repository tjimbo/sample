const mocksAndSpies = {
  listTodosSpy: vi.fn(),
  createTodoSpy: vi.fn(),
}

const useTodoRepositoryMock = () => ({
  listTodos: mocksAndSpies.listTodosSpy,
  createTodo: mocksAndSpies.createTodoSpy,
})

export { mocksAndSpies as _useTodoRepository, useTodoRepositoryMock as useTodoRepository }
