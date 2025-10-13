// ...existing code...
type NewsCardSubscriptionProps = {
    children: React.ReactNode;
    date?: [number, number, number];
};

export function NewsCardSubscription({children, date = [1,2,2]}: NewsCardSubscriptionProps) {
    // date: [day, month, year]
    return (
        <div className="news-card-subscription">
            <div>
                {date[0]}.{date[1]}.{date[2]}
            </div>
            <div>
                <p className="author-text">Автор: {children}</p>
            </div>
        </div>
    );
}
// ...existing code...
