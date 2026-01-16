import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function ElasticToggle() {
  const [isOn, setIsOn] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const startX = useRef(0)
  const didDrag = useRef(false)

  const handlePointerDown = (e) => {
    e.preventDefault()
    startX.current = e.clientX
    didDrag.current = false
    setIsDragging(true)
    setIsMoving(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const delta = e.clientX - startX.current
    if (Math.abs(delta) > 5) didDrag.current = true
    // Clamp dragX so handle stays within bounds
    const baseX = isOn ? 60 : 20
    const newX = Math.max(20, Math.min(60, baseX + delta))
    setDragX(newX - baseX)
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const baseX = isOn ? 60 : 20
    const currentX = baseX + dragX
    const threshold = 40 // midpoint
    
    // Toggle if crossed threshold, otherwise snap back
    if ((isOn && currentX < threshold) || (!isOn && currentX > threshold)) {
      setIsOn(!isOn)
    }
    
    setDragX(0)
    setTimeout(() => setIsMoving(false), 150)
  }

  const handleClick = () => {
    // Only toggle on click if we didn't drag
    if (!didDrag.current) {
      setIsOn(!isOn)
      setIsMoving(true)
      setTimeout(() => setIsMoving(false), 150)
    }
  }

  const baseX = isOn ? 60 : 20
  const cx = isDragging ? baseX + dragX : baseX

  return (
    <button
      type="button"
      aria-label="Toggle"
      onClick={handleClick}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <svg width="80" height="40" viewBox="0 0 80 40">
        <rect x="0" y="0" width="80" height="40" rx="20" fill={isOn ? '#4ade80' : '#444'} />
        <motion.ellipse
          animate={{ cx, rx: isMoving ? 20 : 16 }}
          cy="20"
          ry="16"
          fill="#fff"
          style={{ cursor: 'grab' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </svg>
    </button>
  )
}

export default ElasticToggle
