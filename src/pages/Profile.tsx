import { Button } from "@/components/UI"

function Profile() {
    const onClick = () => {
        const isOk = confirm('Are you sure you want to delete the cache?')
        if (isOk) {
            localStorage.clear()
        }
    }
    return (
        <div>
            <h2 className="my-3 font-bold">Clear store</h2>
            <Button variant="tertiary" className="bg-blue-600 text-white" onClick={onClick}>continue</Button>
        </div>
    )
}

export default Profile