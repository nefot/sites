import './LastNews.scss';
import "./filter.scss"
import "./ButtonList.scss";
import type {lastNewsDataType} from '../../types/lastNewsDataType.ts';

import {Tag} from "../TagButton/TagButton";
import React, {useRef, useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router-dom";




export default function LastNews({data}: { data: lastNewsDataType[] }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="filter-news">
                <div className="last-news-container">
                    {data.map((item: lastNewsDataType) => (
                        <div className="last-news-item" key={item.id}>
                            <div className="last-news-item-container" onClick={() => navigate(`/news/${item.id}`)} style={{cursor: 'pointer'}}>
                                <div>
                                    <p className={item.format === 'red' ? 'date-red' : 'date-black'}>{item.date[0]}</p>
                                    <div>
                                        <p>{item.date[1]}</p>
                                        <p>{item.date[2]}</p>
                                    </div>
                                </div>
                                <p>{item.title}</p>
                            </div>
                        </div>

                    ))}
                </div>
                <Filters/>

            </div>
        </>
    )
}

export function ButtonList(text: string, sortOptions: string[] = []) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleSelect = (option: string) => {
        setOpen(false);
        // Заглушка: здесь будет обраб��тка сортировки
        alert(`Выбрана сортировка: ${option}`);
    };
    return (
        <div className="button-list" style={{position: 'relative'}} ref={dropdownRef}>
            <button className="list-button" onClick={() => setOpen((o) => !o)}>
                {text}
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.25L4.5 4.75L1 1.25" stroke="black" strokeWidth="1"/>
                </svg>
            </button>
            {open && (
                <div className="sort-dropdown">
                    {sortOptions.map((option, idx) => (
                        <div className="sort-option" key={idx} onClick={() => handleSelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// Вынесём массив tags за пределы компонента Filters, чтобы ссылка не менялась
const tags = [
    "Короткий", "ОченьДлинныйТегДляПроверки", "СреднийТег", "Тег", "ЕщёТег", "ДлинныйТег", "Тест", "React", "TypeScript"
].sort((a, b) => a.length - b.length);

const sortOptions = [
    "Сначала новые",
    "Сначала старые",
    "По алфавиту"
];

export function Filters() {
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLDivElement>(null);
    const [rows, setRows] = useState<string[][]>([]);

    // Используем те же теги

    // Пересчитываем строки при изменении ширины окна или контейнера
    useLayoutEffect(() => {
        function recalc() {
            if (!containerRef.current || !hiddenRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            // Получаем ширины всех тегов из скрытого контейнера
            const tagNodes = Array.from(hiddenRef.current.children) as HTMLDivElement[];
            const tagWidths = tagNodes.map(node => node.offsetWidth);
            const gap = 10; // если gap другой, поменяйте здесь
            let currentRow: string[] = [];
            let currentWidth = 0;
            const result: string[][] = [];
            tags.forEach((tag, idx) => {
                const tagWidth = tagWidths[idx] || 0;
                if (currentWidth + tagWidth + (currentRow.length > 0 ? gap : 0) > containerWidth) {
                    if (currentRow.length > 0) result.push(currentRow);
                    currentRow = [tag];
                    currentWidth = tagWidth;
                } else {
                    if (currentRow.length > 0) currentWidth += gap;
                    currentRow.push(tag);
                    currentWidth += tagWidth;
                }
            });
            if (currentRow.length > 0) result.push(currentRow);
            setRows(result);
        }

        recalc();
        window.addEventListener('resize', recalc);
        return () => window.removeEventListener('resize', recalc);
    }, []);

    return (
        <div className="filter">
            <p>фильтры</p>
            {/* Скрытый контейнер для измерения ширины тегов */}
            <div style={{position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden'}} ref={hiddenRef}>
                {tags.map((tag, i) => (
                    <Tag inactive={true} key={i}>{tag}</Tag>
                ))}
            </div>
            <div className="tags-filter" ref={containerRef}>
                {rows.map((row, i) => (
                    <div className="tags-filter-horisontal" key={i}>
                        {row.map((tag, j) => (
                            <Tag inactive={true} key={j}>{tag}</Tag>
                        ))}
                    </div>
                ))}
                <hr/>
            </div>
            {ButtonList("Сортировка", sortOptions)}
        </div>
    );
}