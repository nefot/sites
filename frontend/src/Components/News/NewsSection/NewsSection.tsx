import React, { useState, useEffect } from 'react';
import {NewsTitle} from './NewsTitle.tsx';
import LastNews from "../LastNews.tsx";
import {NewsCard} from "../../Landing/News/News.tsx";
import {DataNews} from "../../datas/dataNews.ts";
import {lastNewsData} from "../../datas/LastNewsData.tsx";
import { useAuth } from '../../../context/AuthContext';
import type { NewsItem } from '../../Landing/News/NewsItem.tsx';
import { authAPI } from '../../../services/api';

export function NewsSection() {
    const auth = useAuth();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', imageUrl: '', tags: '' });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            try {
                const data = await authAPI.getNews();
                if (mounted) {
                    // Map server news to NewsItem shape if needed
                    setNews(Array.isArray(data) ? data as NewsItem[] : []);
                }
            } catch (e) {
                console.error('Failed to load news', e);
                setError(e instanceof Error ? e.message : String(e));
                // fallback to local data
                setNews(DataNews as NewsItem[]);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleAdd() {
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
        setForm({ title: '', description: '', imageUrl: '', tags: '' });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        const payload = {
            title: form.title || 'Без заголовка',
            description: form.description || '',
            imageUrl: form.imageUrl || undefined,
            tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        };
        try {
            const token = auth.token || localStorage.getItem('token') || '';
            if (!token) throw new Error('Требуется авторизация');
            const created = await authAPI.addNews(payload, token);
            // prepend created news
            setNews(prev => [created as NewsItem, ...prev]);
            setShowForm(false);
            setForm({ title: '', description: '', imageUrl: '', tags: '' });
        } catch (e) {
            console.error('Add news failed', e);
            setError(e instanceof Error ? e.message : String(e));
        }
    }

    return (
        <>
            <NewsTitle/>
            <LastNews data={lastNewsData}/>
            <div className="window-divider">
                <NewsCard data={news.length ? news : DataNews as any} type="horizontal"/>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                {auth.user ? (
                    <div style={{ width: '100%', maxWidth: 900 }}>
                        {error && <div className="error-message">{error}</div>}
                        {!showForm ? (
                            <button className="btn --primary" onClick={handleAdd}>Добавить новость</button>
                        ) : (
                            <form onSubmit={handleSubmit} className="add-news-form" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <input name="title" placeholder="Заголовок" value={form.title} onChange={handleChange} required />
                                <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} required />
                                <input name="imageUrl" placeholder="URL изображения" value={form.imageUrl} onChange={handleChange} />
                                <input name="tags" placeholder="Теги через запятую" value={form.tags} onChange={handleChange} />
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="submit" className="btn --primary">Сохранить</button>
                                    <button type="button" className="btn" onClick={handleCancel}>Отмена</button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <div>Чтобы добавить новость, необходимо <a href="/login">войти</a>.</div>
                )}
            </div>

        </>
    );
}


export default NewsSection;
