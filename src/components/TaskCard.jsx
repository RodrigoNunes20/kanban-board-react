export default function TaskCard({ task, onRemove }){
  return (
    <div className="rounded-xl border p-3 bg-white dark:bg-zinc-900 flex items-center justify-between">
      <span>{task.content}</span>
      <button onClick={onRemove} className="rounded-lg border px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800">x</button>
    </div>
  )
}
