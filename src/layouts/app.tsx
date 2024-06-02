import { cn } from '@/utils/cn'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <main
      className={cn([
        'grid min-h-dvh grid-cols-1 grid-rows-[1fr_96px] bg-gray-900',
        'sm:grid-cols-[112px_1fr] sm:grid-rows-1',
      ])}
    >
      <aside></aside>
      <section className="p-8">
        <Outlet />
      </section>
    </main>
  )
}

export { AppLayout }
