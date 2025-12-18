import React from "react";
import Button from "../Button/Button";
import "./TagButton.scss";
import { useNavigate } from 'react-router-dom';

interface TagProps {
    children: React.ReactNode;
    inactive?: boolean;
    onClick?: () => void;
}

export function Tag({children, inactive = false, onClick}: TagProps) {
    const navigate = useNavigate();
    const label = String(children);
    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        // По умолчанию переходим на страницу новостей и подставляем ::тег
        const q = `::${label}`;
        navigate(`/news?q=${encodeURIComponent(q)}`);
    };

    return <Button onClick={handleClick} className={inactive ? "tag tag--inactive" : "tag"}>#{children}</Button>;
}
