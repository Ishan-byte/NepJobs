import NavBar from "../nav";

export default function DashboardLayout({children}) {
    return (
        <div>
            <NavBar />
            <div>{children}</div>
        </div>
    )
}