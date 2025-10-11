export function WayToTeach(props: { title: string, description: string }) {
    return (
        <li>
            <p>
                <strong>{props.title}</strong>{props.description}
            </p>
        </li>
    )
}