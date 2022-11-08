import { Block } from "@/interfaces"
import { getTextBlock } from '@/utils/getTextBlock'

interface Props {
    block: Block
}

export function TableBlock({ block }: Props) {
    const { results = [] } = block.table
    return (
        <div className="border border-gray-200 rounded-sm overflow-auto mb-4">
            <table className="w-full">
                <thead>
                    <tr className="text-left sm:text-center bg-gray-100 divide-x divide-gray border-b border-b-gray-200">
                        {results[0]?.table_row?.cells?.map((cell, index) => (
                            <th key={index}>
                                <div className="text-sm py-2 px-2.5" dangerouslySetInnerHTML={{ __html: getTextBlock(cell) }}></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((row, index) => {
                        if (index > 0) {
                            return (
                                <tr key={row.id} className="text-left sm:text-center divide-x divide-gray-200 border-b border-b-gray-200">
                                    {row.table_row.cells?.map((cell, index) => (
                                        <th key={index}>
                                            <div className="text-sm py-2 px-2.5 font-light" dangerouslySetInnerHTML={{ __html: getTextBlock(cell) }}></div>
                                        </th>
                                    ))}
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}