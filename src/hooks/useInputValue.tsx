import { ChangeEvent, useState } from "react"

export function useInputValue(initialState: string = '') {
    const [value, setValue] = useState(initialState)
    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }
    const clear = () => setValue('')
    return {
        value,
        onChange,
        clear,
    }
}