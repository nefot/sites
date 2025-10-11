import './Button.css';

export default function Button(props: { text: string, onClick: () => void }) {
    return (
        <button className="custom-btn" onClick={props.onClick}>
            {props.text}
        </button>
    )
}