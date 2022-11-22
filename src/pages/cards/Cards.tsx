import { useState, useEffect } from 'react';
import { Flipper } from "@/components/UI/Flipper"
import { getRandomList } from '@/utils/applySentenceColor'
import { IVerb } from "@/interfaces"
import verbs from '@/assets/verbs.json'

const randomList = getRandomList<IVerb>(verbs.regular, 9)
const shuffleList = () => {
    const firstList = randomList.map((item) => ({ ...item, type: 'image', isFreeze: false }))
    const secondList = randomList.map((item) => ({ ...item, type: 'baseForm', isFreeze: false }))
    return firstList.concat(secondList).sort(() => 0.5 - Math.random())
}

function Cards() {
    const [list, setList] = useState(shuffleList())

    const onChangeItem = (index: number) => {
        const currentElement = list[index]
        if (currentElement.isFreeze) return
        const copy = [...list]
        const subIndex = copy.findIndex((item) => currentElement.baseForm === item.baseForm && item.type !== copy[index].type && item.isFlipped)
        if (subIndex !== -1) {
            copy[index].isFreeze = true
            copy[subIndex].isFreeze = true
        }

        // setFlipped
        copy[index].isFlipped = !copy[index].isFlipped
        setList(copy)
    }

    const setActive = (index: number, value: boolean) => {
        const copy = [...list]
        if (copy[index].isFreeze) return
        copy[index].isFlipped = value
        setList(copy)
    }

    return (
        <div>
            <section className="grid grid-cols-3 gap-1.5">
                {list.map((item, index) => {
                    if (item.type === 'image') {
                        return (
                            <Flipper
                                key={index}
                                isActive={item.isFlipped}
                                isFreeze={item.isFreeze}
                                onChange={() => onChangeItem(index)}
                                setActive={(value) => setActive(index, value)}
                            >
                                <img src={item.image} alt={item.baseForm} className="h-full object-cover" />
                            </Flipper>
                        )
                    }
                    return (
                        <Flipper
                            key={index}
                            isActive={item.isFlipped}
                            isFreeze={item.isFreeze}
                            onChange={() => onChangeItem(index)}
                            setActive={(value) => setActive(index, value)}
                        >
                            <p className="font-bold text-2xl text-white">{item.baseForm}</p>
                        </Flipper>
                    )
                })}
            </section>
        </div>
    )
}

export default Cards