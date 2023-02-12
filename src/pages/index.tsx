import Main from "@/components/Main";
import Nav from "@/components/Nav";
import Link from "next/link";

export default function Home() {

    return (
        <div>
            <Nav />
            <Main />
            <Link href="/login">
                {/* <h1>hi</h1> */}
            </Link>
        </div>
    )
}