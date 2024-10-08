import { useTodoRepository } from '@/repositories/useTodoRepository'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreatePage = () => {
  const { createTodo } = useTodoRepository()
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = async () => {
    const title = inputRef.current?.value
    if (!title) {
      return
    }
    await createTodo({
      title,
      completed: false,
    })
    navigate('/')
  }

  return (
    <form className="flex flex-col">
      <h1 className="text-2xl">Todoを登録する</h1>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="register_todo_input">Todoタイトル</label>
        <input id="register_todo_input" ref={inputRef} type="text" placeholder="例：明日の献立を考える" />
      </div>
      <input
        className="w-16 mt-12 cursor-pointer bg-slate-500 text-white"
        type="button"
        value="登録"
        onClick={onSubmit}
      />
    </form>
  )
}
