import { BlockType, RichText, Block } from '@/interfaces'

const COLORS: { [key: string]: string} = {
    blue: '#337ea9',
    brown: '#9f6b53',
    gray: '#787774',
    green: '#448361',
    orange: '#d9730d',
    pink: '#c14c8a',
    purple: '#9065b0',
    red: '#d44c47',
    yellow: '#cb912f',
}

export function getTextBlock(richText: RichText[]) {
    const elements = richText.map((item) => {
        const { text, annotations } = item
        const { content, link } = text
        let element = content
        let classes = []
        let color = annotations.color !== 'default' ? COLORS[annotations.color] : '#37352f'

        if (Object.values(annotations).includes(true)) {
            if (annotations.bold) classes.push('font-bold')
            if (annotations.italic) classes.push('italic')
            if (annotations.underline) classes.push('underline')
            if (annotations.strikethrough) classes.push('line-through')
        }

        element = `<span style="color: ${color}" class="${classes.join(' ')}">${element}</span>`

        if (link !== null) {
            element = `<a class="${classes.join(' ')} target='_blank' href="${link.url}">${element}</a>`
        }

        return element
    })

    return elements.join('')
}

export function getListItem(index: number, type: BlockType, blocks: Block[]) {
    const list = []
    for (let i = index; i < blocks.length; i++) {
        if (blocks[i].type !== type) {
            i = blocks.length
        } else {
            list.push(blocks[i])
        }
    }
    return list
}
