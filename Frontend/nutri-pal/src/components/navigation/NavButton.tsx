
import { auth } from '@/app/firebase-config';
import '@/styles/NavButton.css'
import { signOut } from 'firebase/auth';
import { usePathname } from 'next/navigation';

type IconProps = {
    className?: string;
    size?: number;
};

type NavButtonProps = {
    label: string;
    Icon: React.ComponentType<IconProps>;
    path: string;
    logout?: boolean;
}

export const NavButton = ({ label, Icon, path, logout = false }: NavButtonProps) => {
    const pathname = usePathname()
    const ICON_SIZE = 30

    const handleLogout = () => {
        signOut(auth)
    }

    return (
        <a href={path}>
            <button className={`navbutton-container ${pathname === path ? 'navbutton-container-pathname' : ''}`} onClick={logout ? handleLogout : undefined}>
                <Icon size={ICON_SIZE} className="navbutton-icon" />
                <p className="navbutton-label">
                    {label}
                </p>
            </button>
        </a>
    )
}
