function ElasticToggle() {
  return (
    <button type="button" aria-label="Toggle" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      <svg width="80" height="40" viewBox="0 0 80 40">
        <rect x="0" y="0" width="80" height="40" rx="20" fill="#444" />
        <circle cx="20" cy="20" r="16" fill="#fff" />
      </svg>
    </button>
  )
}

export default ElasticToggle
