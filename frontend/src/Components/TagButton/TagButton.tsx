import React from "react";
import Button from "../Button/Button";
import "./TagButton.scss";

interface TagProps {
    children: React.ReactNode;
    inactive?: boolean;
}

export function Tag({children, inactive = false}: TagProps) {
    return <Button className={inactive ? "tag tag--inactive" : "tag"}>#{children}</Button>;
}
