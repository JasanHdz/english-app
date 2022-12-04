import { useState, useMemo, useEffect, ChangeEvent, useCallback, useLayoutEffect } from 'react';
import { Flipper } from "@/components/UI/Flipper"
import { getRandomList } from '@/utils/applySentenceColor'
import { IVerb, VerbType } from "@/interfaces"
import verbs from '@/assets/verbs.json'

const options: VerbType[] = ['image', 'baseForm', 'continuosForm', 'passTense', 'spanish']


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
    const [randomList, setRandomList] = useState<IVerb[]>([])
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
        let timer: ReturnType<typeof setTimeout>
        if (isSuccess) {
            timer = setTimeout(() => {
                alert('Congratulations, you got everyone right!')
                const response = confirm('Do you want to play again?')
                if (response) {
                    setTimeout(() => {
                        const newRandomList = getRandomList<IVerb>(prevList, verbs.regular, 6)
                        const newCardList = getShuffleList(newRandomList)
                        const newPreviousList = [...prevList, ...randomList]
                        setPrevList(newPreviousList)
                        localStorage.setItem('prevList', JSON.stringify(newPreviousList))
                        setRandomList(newRandomList)
                        setCardList(newCardList)
                    }, 1500)
                }
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [isSuccess])

    useEffect(() => {
        let initialRandomList: IVerb[] = []
        if (!prevList.length || !randomList.length) {
            const initialPrevList = JSON.parse(localStorage.getItem('prevList') ?? '[]')
            initialRandomList = getRandomList<IVerb>(initialPrevList, verbs.regular, 6)
            setPrevList(initialPrevList)
            setRandomList(initialRandomList)
        }
        const shuffleList = getShuffleList(initialRandomList)
        setCardList(shuffleList)
    }, [currentOption])

    return (
        <div>
            <small className='pl-1 text-[9px] text-gray-500 font-bold'>Palabras dominadas: {prevList.length} de {verbs.regular.length}</small>
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
            {cardList.length ? (
                <section className="grid grid-cols-3 sm:grid-cols-4 gap-1">
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
            ) : (
                <div className='loader text-center font-bold'>
                    <p>Ups! se terminaron las palabras! 😢</p>
                </div>
            )}
        </div>
    )
}

export default Cards