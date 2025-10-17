import Button from "../../Button/Button.tsx";

export function NewsCardHeader(className: string) {
    function handleClick(text: string) {
        console.log('Button clicked', text);
    }
    return (
        <>
            <div className="news-card-header flex-justify-space-between margin-10 chapter-title">
                <h3>{className}</h3>
                <Button onClick={() => handleClick('All')} active={false}>показать все</Button>
            </div>
        </>
    )
}