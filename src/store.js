import { create } from 'zustand'
function read(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
const defaultBoard = {
  columns: { todo:{id:'todo',title:'To do',taskIds:['t1','t2']}, doing:{id:'doing',title:'Doing',taskIds:['t3']}, done:{id:'done',title:'Done',taskIds:[]} },
  tasks: { t1:{id:'t1',content:'Criar layout'}, t2:{id:'t2',content:'Definir paleta'}, t3:{id:'t3',content:'Implementar drag & drop'} },
  columnOrder:['todo','doing','done']
}
export const useBoard = create((set)=> ({
  data: read('kanban', defaultBoard),
  addTask: (columnId, content)=> set(s=>{ const id='t'+Math.random().toString(36).slice(2,8); const d=structuredClone(s.data); d.tasks[id]={id,content}; d.columns[columnId].taskIds.push(id); save('kanban',d); return {data:d} }),
  removeTask: (taskId)=> set(s=>{ const d=structuredClone(s.data); delete d.tasks[taskId]; for(const c of Object.values(d.columns)){ c.taskIds=c.taskIds.filter(id=>id!==taskId) } save('kanban',d); return {data:d} }),
  moveTask: (source,destination)=> set(s=>{ const d=structuredClone(s.data); const src=d.columns[source.droppableId]; const dst=d.columns[destination.droppableId]; const [m]=src.taskIds.splice(source.index,1); dst.taskIds.splice(destination.index,0,m); save('kanban',d); return {data:d} })
}))
