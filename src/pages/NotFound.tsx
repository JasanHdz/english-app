import { Link } from "react-router-dom"
import { Button } from "@/components/UI"

export function NotFound({ message }: { message?: string }) {
    return (
        <div className="flex justify-center items-center flex-col gap-5 min-h-screen">
            <p>{message ?? 'Pagina en construccion 🛠️'}</p>
            <Link to='/'>
                <Button variant="secondary" className="w-52">Go back</Button>
            </Link>
        </div>
    )
}