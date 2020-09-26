import Link from "next/link";

export default function HomePage() {
    return <div><h1>Homepage Page</h1>

        <Link href="/people">
            <a>People</a>
        </Link>

        <hr />

        <Link href="/vehicles">
            <a>Vehicles</a>
        </Link>

    </div>
}