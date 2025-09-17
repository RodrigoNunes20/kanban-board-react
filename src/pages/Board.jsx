import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useBoard } from '../store'
import TaskCard from '../components/TaskCard'
export default function Board(){
  const { data, addTask, removeTask, moveTask } = useBoard()
  function onDragEnd(result){
    const { source, destination } = result
    if(!destination) return
    if(source.droppableId===destination.droppableId && source.index===destination.index) return
    moveTask(source, destination)
  }
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map(colId=>{
          const col = data.columns[colId]
          return (
            <section key={col.id} className="rounded-2xl bg-gray-100 dark:bg-zinc-900/50 p-4">
              <header className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">{col.title}</h2>
                <button className="rounded-xl border px-2 py-1" onClick={()=>{
                  const content = prompt('Nova tarefa')
                  if(content) addTask(col.id, content)
                }}>+ Add</button>
              </header>
              <Droppable droppableId={col.id}>
                {(provided)=>(
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-4">
                    {col.taskIds.map((tid, idx)=>{
                      const task = data.tasks[tid]
                      return (
                        <Draggable key={tid} draggableId={tid} index={idx}>
                          {(prov)=>(
                            <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                              <TaskCard task={task} onRemove={()=>removeTask(tid)} />
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>
          )
        })}
      </DragDropContext>
    </div>
  )
}
