import { BaseLayout } from "#views/layout";

export function HomePage() {
    return (
        <BaseLayout>
            <form method="POST">
                <input type="text" name="name" placeholder="Enter your name" />
                <button type="submit">Submit</button>
            </form>
        </BaseLayout>
    );
}