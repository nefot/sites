import React, { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runTest = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const apiBase = import.meta.env.VITE_API_URL || ''
      const url = apiBase ? `${apiBase.replace(/\/$/, '')}/pages` : `/api/pages`
      const res = await fetch(url)
      const ct = res.headers.get('content-type') || ''
      const text = await res.text()
      setResult(`status: ${res.status}\ncontent-type: ${ct}\n\npreview:\n${text.slice(0, 1000)}`)
    } catch (err: any) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{padding:16}}>
      <h2>Test Page</h2>
      <p>VITE_API_URL: <code>{import.meta.env.VITE_API_URL ?? '(not set)'}</code></p>
      <button onClick={runTest} disabled={loading} style={{padding:'8px 12px'}}>
        {loading ? 'Running…' : 'Fetch /pages'}
      </button>
      {error && <pre style={{color:'crimson',whiteSpace:'pre-wrap',marginTop:12}}>{error}</pre>}
      {result && <pre style={{whiteSpace:'pre-wrap',marginTop:12}}>{result}</pre>}
    </div>
  )
}

