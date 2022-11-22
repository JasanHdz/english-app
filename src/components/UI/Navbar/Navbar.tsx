import { Link } from 'react-router-dom'
import Wrapper from "@/components/Layout/Wrapper"
import { LearnPaths } from '@/routes/paths'

export function Navbar() {
    return (
        <div className="border-b-2 sticky bg-white top-0 z-40">
            <Wrapper className="py-2.5">
                <div className="block">
                    <Link to={LearnPaths.HOME} className="text-green-500 font-bold text-xl hover:text-green-500">LearnEN</Link>
                </div>
            </Wrapper>
        </div>
    )
}