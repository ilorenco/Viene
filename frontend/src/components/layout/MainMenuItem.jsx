import { Link } from 'react-router-dom'

import { SheetClose } from '@/components/ui/Sheet'

export function MainMenuItem({ to, label, icon: Icon }) {
    return (
        <li>
            <SheetClose asChild>
                <Link
                    to={to}
                    className="text-secondary flex items-center gap-3 font-medium"
                >
                    <Icon className="text-foreground size-5" />
                    {label}
                </Link>
            </SheetClose>
        </li>
    )
}
