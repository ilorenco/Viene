import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { cn } from '../../lib/utils'
import { Input } from './Input'

export function PasswordInput({ className, ...props }) {
    const [showPassword, setShowPassword] = useState(false)
    const Icon = showPassword ? Eye : EyeOff

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-14', className)}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer focus:outline-none"
            >
                <Icon size={26} strokeWidth={1.75} className="text-secondary" />
            </button>
        </div>
    )
}
