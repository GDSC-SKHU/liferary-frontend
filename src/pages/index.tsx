import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {

    return (
        <div>
            <Logo />
            <Link href="/login">
                <h1>hi</h1>
            </Link>
        </div>
    )
}