import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {

    return (
        <div>
            <Link href="/">
                <Logo />
            </Link>
            <h1>hi</h1>
        </div>
    )
}