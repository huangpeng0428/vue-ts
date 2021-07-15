import {TodoItem, ArchiveItem} from '@/type'

const db: {
  todo: Array<TodoItem>
  archive: Array<ArchiveItem>
} = {
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
