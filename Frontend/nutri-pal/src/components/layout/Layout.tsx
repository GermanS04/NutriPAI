import { TopBarMain } from "../navigation/TopBarMain"

export const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <TopBarMain />
            {children}
        </>
    )
}
