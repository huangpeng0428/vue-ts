import {TodoItem, ArchiveItem} from '@/type'

const db: {
  todoId: number,
  todo: Array<TodoItem>
  archive: Array<ArchiveItem>
} = {
  todoId: 2,
  todo: [
    { id: 1, title: "小郡肝串串 🍢", createTime: 1610182276778 },
    { id: 2, title: "学会 Vue3.0 😎", createTime: 1610182286778 }
  ],
  archive: [{
    id: 1,
    title: "Docker 从入门到放弃 😒",
    sourceId: 3,
    createTime: 1610182176778
  }]
}

const proxy = (cb: () => void, timeout = 200) => {
  setTimeout(cb, timeout);
}

export const getTodo = () =>
  new Promise<{todo: TodoItem[]; archive: ArchiveItem[]}> (r => {
    proxy(() => r({todo: db.todo, archive: db.archive}))
  })


  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  export const createTodo = (title: string) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      console.log(title)
      db.todo.unshift({ id: ++db.todoId, title, createTime: Date.now() });
      r({ status: true });
    });
  });
