import {TodoItem, ArchiveItem} from '@/type'

const db: {
  todoId: number,
  archiveId: number,
  todo: Array<TodoItem>
  archive: Array<ArchiveItem>
} = {
  todoId: 2,
  archiveId: 1,
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
//创建左右todolist
export const createTodo = (title: string) =>
new Promise<{ status: true }>(r => {
  proxy(() => {
    console.log(title)
    db.todo.unshift({ id: ++db.todoId, title, createTime: Date.now() });
    r({ status: true });
  });
});


//修改左边item
export const updateTodo = (id: number, value: string) => 
new Promise<{status: true}> (r => {
  proxy(() => {
    db.todo = db.todo.map(i => (i.id === id ? {...i, value} : i))
    r({status: true})
  }, 400)
})

//删除左边item
export const deleteTodo = (id: number) => 
new Promise<{status: true}> ((r) => {
  proxy(() => {
    console.log('id', id)
    db.todo = db.todo.filter(e => e.id !==id)
    r({status: true})
  })
})

//创建右边选中list
export const createArchive = (activeTodo: TodoItem) =>
new Promise<{status: true}> (r => {
  db.archive.unshift({
    ...activeTodo,
    sourceId: activeTodo.id,
    id: ++db.archiveId
  })
  r({status: true})
})

//删除右边list
export const deleteArchive = (id: number) =>
new Promise<{status: true}> (r => {
  db.archive = db.archive.filter(e => e.id !== id)
  r({status: true})
})

//回档
export const backArchive = (id: number) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.archive = db.archive.filter(r => {
        if (r.id === id) {
          db.todo.unshift({
            id: r.sourceId,
            title: r.title,
            createTime: r.createTime
          });
          return false;
        }
        return true;
      });

      r({ status: true });
    });
  });

