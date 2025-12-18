import {NewsTitle} from './NewsTitle.tsx';
import LastNews from "../LastNews.tsx";
import {NewsCard} from "../../Landing/News/News.tsx";
import {DataNews} from "../../datas/dataNews.ts";
import {lastNewsData} from "../../datas/LastNewsData.tsx";
import { useAuth } from '../../../context/AuthContext';
import type { NewsItem } from '../../Landing/News/NewsItem.tsx';
import { authAPI } from '../../../services/api';
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function NewsSection() {
    const auth = useAuth();
    const location = useLocation();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', imageUrl: '', tags: '' });
    const [error, setError] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('Сначала новые');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Если в URL есть параметр q, используем его как начальный термин поиска
    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search);
            const q = params.get('q') || '';
            if (q) {
                // q может быть закодированным, декодируем
                const decoded = decodeURIComponent(q);
                setSearchTerm(decoded);
            }
        } catch (err) {
            // ignore
        }
    }, [location.search]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
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
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const sortedNews = useMemo(() => {
        const source = news.length ? news : (DataNews as NewsItem[]);
        const copy = [...source];
        const toTime = (d: number[] = [1,1,1970]) => {
            const [day, month, year] = d || [1,1,1970];
            return new Date(year || 1970, ((month || 1) - 1), (day || 1)).getTime();
        };
        if (sortOption === 'Сначала новые') {
            copy.sort((a, b) => toTime((b as any).date) - toTime((a as any).date));
        }
        // else if (sortOption === 'Сначала старые') {

            // copy.sort((a, b) => toTime((a as any).date) - toTime((b as any).date));
        // }
        else if (sortOption === 'По алфавиту') {

            copy.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        }
        return copy;
    }, [news, sortOption]);

    // Фильтрация новостей по строке поиска или по тегу (::)
    const filteredNews = useMemo(() => {
        const source = (sortedNews && sortedNews.length) ? sortedNews : (DataNews as NewsItem[]);
        const term = (searchTerm || '').trim();
        if (!term) return source;

        // Поиск по тегу: префикс ::
        if (term.startsWith('::')) {
            const tagQuery = term.replace(/^::\s*/, '').toLowerCase();
            if (!tagQuery) return source;
            return source.filter(item => {
                const tags = (item as any).tags || [];
                return Array.isArray(tags) && tags.some((t: string) => (t || '').toLowerCase().includes(tagQuery));
            });
        }

        // Обычный текстовый поиск по заголовку, описанию и тегам
        const q = term.toLowerCase();
        return source.filter(item => {
            const title = (item as any).title || '';
            const description = (item as any).description || '';
            const tags = (item as any).tags || [];
            const inTitle = title.toLowerCase().includes(q);
            const inDesc = description.toLowerCase().includes(q);
            const inTags = Array.isArray(tags) && tags.some((t: string) => (t || '').toLowerCase().includes(q));
            return inTitle || inDesc || inTags;
        });
    }, [sortedNews, searchTerm]);

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
            <LastNews data={lastNewsData} onSortChange={setSortOption} selectedSort={sortOption} onSearchChange={setSearchTerm} searchValue={searchTerm} />
             <div className="window-divider">
                <NewsCard data={filteredNews.length ? filteredNews : (DataNews as any)} type="horizontal"/>
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
