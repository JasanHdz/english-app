import { Link } from 'react-router-dom'
import { LearnPaths } from '@/routes/paths'
import { useCallback } from 'react'

const topicList = [
    {
        name: 'Pronouns + Verb to be',
        topic: 'pronouns'
    },
    {
        name: 'Present Simple',
        topic: 'simple-present'
    },
    {
        name: 'Simple Future aux(will)',
        topic: 'simple-future'
    },
    {
        name: 'Future aux(going to)',
        topic: 'future'
    },
]

const greetings = {
    morning: 'Hi, Good morning 🌅 guy!',
    afternoon: 'Hi, Good evening ☀️ guy!',
    night: 'Hi, Good night 🌃 guy!'
}

function Main() {
    const getGreeting = useCallback(() => {
        const hours = new Date().getHours()
        if (hours < 12) return greetings.morning
        if (hours >= 12 && hours < 19) return greetings.afternoon
        return greetings.night
    }, [])
    return (
        <>
            <h2 className='text-xl font-bold'>{getGreeting()}</h2>
            <p className='font-bold mt-6'>List of Topics:</p>
            <ul className='my-3 pl-3 grid gap-2'>
                {topicList.map(({ topic, name }, index) => (
                    <li key={index}>
                        <Link to={LearnPaths.TOPIC.replace(':topic', topic)}>{name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Main