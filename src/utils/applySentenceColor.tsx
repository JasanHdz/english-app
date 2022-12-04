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


export const getRandomList = <T = any>(prevList: any[], list: any[], size: number) => {
    const elements = Array.from({ length: size }).map(() => getRandomElement(prevList, list))
    return elements as T[]
}

export const getRandomElement = <T = any>(prevList: T[], list: T[]): T => {
    const updatedList = list.filter((item) => !prevList.includes(item))
    const item = generateRandomElement(updatedList)
    return item
}