import { Link } from "react-router-dom";


interface props {
    data: string[]
}
const AllWorkOuts  = () => {
    const list = localStorage.getItem('userData')
    const workoutlist = JSON.parse(list ?? '[]')
    let total = 0
    for (let x = 0; x < workoutlist.length; x++){
        total += workoutlist[x].Calorie_Count
    }
    console.log(workoutlist)
    return <div className="flex flex-col justify-center items-center min-h-screen ">
        <Link to='/' className="px-2 py-1 ml-2 bg-gray-400 rounded-md font-serif hover:bg-gray-600 transition duration-150 text-white mb-2">Back</Link>
        <p className="font-serif">Total: {total}</p>
        <div className="w-[25rem] rounded-lg bg-gray-200 text-center text-lg p-2">
            {workoutlist.map((workouts: any) => (<p className="font-serif">{workouts.name} and {workouts.Calorie_Count}</p>))}
        </div>
    </div>
}

export default AllWorkOuts;