import { Link } from 'react-router-dom'
export default function Shell({ children }){
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      <header className="sticky top-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">Kanban</Link>
          <span className="text-sm opacity-70">Drag & drop para organizar tarefas</span>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </div>
  )
}
