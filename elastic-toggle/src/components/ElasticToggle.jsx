import { useState } from 'react'
import { motion } from 'framer-motion'

function ElasticToggle() {
  const [isOn, setIsOn] = useState(false)

  return (
    <button
      type="button"
      aria-label="Toggle"
      onClick={() => setIsOn(!isOn)}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <svg width="80" height="40" viewBox="0 0 80 40">
        <rect x="0" y="0" width="80" height="40" rx="20" fill={isOn ? '#4ade80' : '#444'} />
        <motion.circle
          animate={{ cx: isOn ? 60 : 20 }}
          cy="20"
          r="16"
          fill="#fff"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </svg>
    </button>
  )
}

export default ElasticToggle
