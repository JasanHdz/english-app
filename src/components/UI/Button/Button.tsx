import React, { useCallback } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary'
    paddingX?: number,
    paddingY?: number
    padding?: number
}

const buttonsVariants: { [key: string]: string } = {
    primary: 'bg-green-500 text-white border-green-600',
    secondary: 'border-2 text-gray-400',
    tertiary: 'border-none'
}

function Button({ children, variant = 'primary', paddingX, padding, paddingY, className, ...otherProps }: Props) {
    const buttonPadding = useCallback(() => {
        if (paddingX && paddingY) {
            return `px-${paddingX} py-${paddingY}`
        }

        if (paddingX) {
            return `px-${paddingX}`
        }

        if (paddingY) {
            return `py-${paddingY}`
        }

        if (padding !== undefined) {
            return `p-${padding}`
        }

        return 'py-2.5 px-4'

    }, [padding, paddingX, paddingY])

    return (
        <button {...otherProps} className={`${buttonPadding()} ${className} w-full uppercase rounded-2xl border-b-4 cursor-pointer inline-flex items-center justify-center text-base font-semibold tracking-wide ${buttonsVariants[variant]}`} >{children}</button>
    )
}

export default Button