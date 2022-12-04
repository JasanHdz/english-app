import { useEffect, ReactNode } from 'react'

type Props = {
    children: ReactNode
    isActive?: boolean
    className?: string
    onChange?: () => void
    setActive?: (value: boolean) => void
    isFreeze?: boolean
}

export function Flipper({ children, className, onChange, isActive, setActive, isFreeze }: Props) {
    const rotate = isActive ? { transform: 'rotateY(180deg)' } : {}
    const background = 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (!isFreeze && isActive && setActive) {
            timer = setTimeout(() => {
                setActive(false)
            }, 2200)
        }
        return () => clearTimeout(timer)
    }, [isActive])

    return (
        <article className="h-[126px] select-none cursor-pointer bg-gray-500 rounded-lg" onClick={onChange}>
            <div style={{ ...rotate, transformStyle: 'preserve-3d' }} className="rounded-lg overflow-hidden h-full duration-300">
                <div style={{ background }} className={`h-full ${isActive ? 'hidden' : 'block'}`}>
                </div>
                <div style={rotate} className={`${className} h-full duration-300 ${!isActive ? 'hidden' : 'flex justify-center items-center'}`}>
                    {children}
                </div>
            </div>
        </article>
    )
}