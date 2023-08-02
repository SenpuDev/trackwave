import { useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

const DroppableStrictMode = ({ droppableId, children }) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = window.requestAnimationFrame(() => setEnabled(true))

    return () => {
      window.cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <Droppable droppableId={droppableId}>
      {children}
    </Droppable>
  )
}

export default DroppableStrictMode
