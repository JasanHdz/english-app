import { useState, useMemo, useEffect, ChangeEvent, useCallback } from 'react';
import { Flipper } from "@/components/UI/Flipper"
import { getRandomList } from '@/utils/applySentenceColor'
import { IVerb, VerbType } from "@/interfaces"
import verbs from '@/assets/verbs.json'

const options: VerbType[] = ['image', 'baseForm', 'continuosForm', 'passTense', 'spanish']
const initialRandomList = getRandomList<IVerb>([], verbs.regular, 10)

function Cards() {
    const [currentOption, setCurrentOption] = useState<{ first: VerbType, second: VerbType }>({
        first: 'image',
        second: 'baseForm'
    })

    const getShuffleList = useCallback((currentList: IVerb[]): IVerb[] => {
        const firstList = currentList.map((item) => ({ ...item, type: currentOption.first, isFreeze: false }))
        const secondList = currentList.map((item) => ({ ...item, type: currentOption.second, isFreeze: false }))
        return firstList.concat(secondList).sort(() => 0.5 - Math.random()) as IVerb[]
    }, [currentOption])

    const [prevList, setPrevList] = useState<IVerb[]>([])
    const [randomList, setRandomList] = useState<IVerb[]>(initialRandomList)
    const [cardList, setCardList] = useState<IVerb[]>([])

    const onChangeItem = (index: number) => {
        const currentElement = cardList[index]
        if (currentElement.isFreeze) return
        const copy = [...cardList]
        const subIndex = copy.findIndex((item) => currentElement.baseForm === item.baseForm && item.type !== currentElement.type && item.isFlipped)
        if (subIndex !== -1) {
            copy[index].isFreeze = true
            copy[subIndex].isFreeze = true
        }

        // setFlipped
        copy[index].isFlipped = !copy[index].isFlipped
        setCardList(copy)
    }

    const setActive = (index: number, value: boolean) => {
        const copy = [...cardList]
        if (copy[index].isFreeze) return
        copy[index].isFlipped = value
        setCardList(copy)
    }

    const onChangeSelected = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        if (name === 'first' && value === currentOption.second) return
        if (name === 'second' && value === currentOption.first) return
        setCurrentOption({
            ...currentOption,
            [name]: value
        })
    }

    const isSuccess = useMemo(() => cardList.length && cardList.every((item) => item.isFreeze), [cardList])

    useEffect(() => {
        if (isSuccess) {
            alert('Congratulations, you got everyone right!')
            const response = confirm('Do you want to play again?')
            if (response) {
                setTimeout(() => {
                    const newRandomList = getRandomList<IVerb>(prevList, verbs.regular, 10)
                    const newCardList = getShuffleList(newRandomList)
                    setPrevList([
                        ...randomList,
                        ...newRandomList
                    ])
                    setRandomList(newRandomList)
                    setCardList(newCardList)
                }, 1500)
            }
        }
    }, [isSuccess])

    useEffect(() => {
        const shuffleList = getShuffleList(randomList)
        setCardList(shuffleList)
    }, [currentOption])

    return (
        <div>
            <small className='pl-1 text-[9px] text-gray-500 font-bold'>Palabras dominadas: {prevList.length / 2} de {verbs.regular.length}</small>
            <div className='flex justify-between mb-3'>
                <select name="first" onChange={onChangeSelected} value={currentOption.first}>
                    {options.map((opt) => {
                        if (opt !== currentOption.second) {
                            return <option key={opt} value={opt}>{opt}</option>
                        }
                    })}
                </select>
                <select name="second" onChange={onChangeSelected} value={currentOption.second}>
                    {options.map((opt) => {
                        if (opt !== currentOption.first) {
                            return <option key={opt} value={opt}>{opt}</option>
                        }
                    })}
                </select>
            </div>
            <section className="grid grid-cols-4 gap-1.5">
                {cardList.map((item, index) => {
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
                            <p className="font-bold text-2xl text-white">{item[item.type]}</p>
                        </Flipper>
                    )
                })}
            </section>
        </div>
    )
}

export default Cards