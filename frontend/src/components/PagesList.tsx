import React, { useEffect, useState } from 'react'

type Page = {
  id: number
  section?: number
  title: string
  content: string
  published?: boolean
  slug: string
}

export default function PagesList(): JSX.Element {
  const [pages, setPages] = useState<Page[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || ''
    const url = apiBase ? `${apiBase.replace(/\/$/, '')}/pages` : `/api/pages`

    let mounted = true
    setLoading(true)
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const contentType = res.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          return res.json()
        }
        const text = await res.text()
        throw new Error(`Expected JSON but received ${contentType || 'unknown'}. Preview: ${text.slice(0, 300)}`)
      })
      .then((data) => {
        if (!mounted) return
        setPages(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!mounted) return
        setError(String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div>Loading pages...</div>
  if (error) return <div className="error">Failed to load pages: {error}</div>
  if (!pages) return <div>No pages found.</div>

  return (
    <div className="pages-list">
      {pages.length === 0 ? (
        <div>No pages available.</div>
      ) : (
        <ul>
          {pages.map((p) => (
            <li key={p.id} className={p.published ? 'published' : 'draft'}>
              <h3>{p.title}</h3>
              <p className="slug">/{p.slug}</p>
              <div className="excerpt">{p.content?.slice(0, 200) ?? ''}{p.content && p.content.length > 200 ? '…' : ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

