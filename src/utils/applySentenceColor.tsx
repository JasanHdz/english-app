function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}


export function applySentenceColor(str: string | null, coincidences: string[], color?: string): string {
    if (!str) return ''
    const words = str.toLocaleLowerCase().split(' ')
    words.forEach((word, index) => {
        if (!coincidences.includes(word.toLowerCase())) return word
        words[index] = `<span class="${color ?? 'text-red-500'}">${capitalizeFirstLetter(words[index])}</span>`
    })
    return words.join(' ')
}

export const generateRandomElement = (items: any[]) => {
    return items[Math.floor(Math.random() * items.length)]
}

export const getRandomList = <T = any>(list: any[], size: number) => {
    const elements = Array.from({ length: size }).map(() => generateRandomElement(list))
    return elements as T[]
}