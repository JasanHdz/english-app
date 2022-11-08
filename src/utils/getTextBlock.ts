import { Block, BlockType } from '@/interfaces'

export function getTextBlock(block: Block) {
    const { type } = block
    const { rich_text } = block[type]

    const elements = rich_text.map((item) => {
        const { text, annotations } = item
        const { content, link } = text
        let element = content

        if (Object.values(annotations).includes(true)) {
            let classes = []
            if (annotations.color !== 'default') classes.push(`text-${annotations.color}-600`)
            if (annotations.bold) classes.push('font-bold')
            if (annotations.italic) classes.push('italic')
            if (annotations.underline) classes.push('underline')
            if (annotations.strikethrough) classes.push('line-through')

            element = `<span class="${classes.join(' ')}">${element}</span>`
        }

        if (link !== null) {
            element = `<a target='_blank' href="${link.url}">${element}</a>`
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
