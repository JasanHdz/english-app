import { Link } from 'react-router-dom'
import { LearnPaths } from '@/routes/paths'

const topicList = [
    {
        name: 'Pronouns + Verb to be',
        topic: 'pronouns'
    },
    {
        name: 'Present Simple',
        topic: 'present'
    },
    {
        name: 'Future Simple aux(will)',
        topic: 'future-simple'
    },
    {
        name: 'Future Simple aux(going to)',
        topic: 'future'
    },
]

function Main() {
    return (
        <>
            <h2 className='text-xl font-bold'>Hello {'{{ USER_NAME }}'}</h2>
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