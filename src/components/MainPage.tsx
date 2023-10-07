import { useState } from "react";
import WorkOutList from "./WorkoutList";
import Data from "./Data";
import { Link } from "react-router-dom";

const MainPage = () => {
    const [workout, setWorkOut] = useState('')
    const workout_data: string[] = ["", 'Legs', 'Chest', 'Tricept', 'Bicep', 'Shoulder']
    const [workoutList, setWorkOutList] = useState([{}]);
    const [display, setDisplay] = useState(false)
    const [userData, setUserData] = useState<object[]>([]);
    const [dates, setDates] = useState<string[]>([])
    const dropDownHandler = (event: any) => {
        setWorkOut(event.target.value)
        getdata(event.target.value)

    }

    const CurrentDisplayDataHandler = (data: any) => {
        setUserData((prevUserData) => [...prevUserData, data]);
        console.log(userData)
      };
      

    async function getdata(workout_type: string) {
        if(workout_type == ""){
            return
        }
        try {
            const response = await fetch(`http://127.0.0.1:5000?workout_type=${workout_type}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            const list = []
            for (let x = 0; x < data.length; x++){
                list.push({
                    'name' : data[x][1],
                    'calorie_count': data[x][2]
                })
            }
            setWorkOutList(list)
            setDisplay(true)
            console.log(list)
        } catch (error) {
            console.error(error);
        }
    }
    const DeleteHandler = () => {
        setUserData((prevUserData) => {
            const updatedUserData = [...prevUserData.slice(0, -1)];
            return updatedUserData;
          });
    }
    const AddHandler = () => {
        const jsonString = JSON.stringify(userData)
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth(); // Note: Months are zero-based (0 for January, 11 for December)
        const day = date.getDate();
        
    
        setDates((prevDates) => ([...prevDates, `${month}/${day}/${year}`]))
        localStorage.setItem(`${month}/${day}/${year}`, jsonString); 
        const d = JSON.stringify(dates)
        localStorage.setItem('userData', jsonString)
    }

    const SeeAllWorkoutsHandler = () => {
        
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
            <h1 className="text-xl mb-7 font-serif font-bold">Gym Tracker</h1>
            <div>
            <button onClick={AddHandler} className="px-2 py-1 ml-2 bg-gray-400 rounded-md font-serif hover:bg-gray-600 transition duration-150 text-white mb-2">Add WorkOut</button>
            <Link to='workouts' className="px-2 py-1 ml-2 bg-gray-400 rounded-md font-serif hover:bg-gray-600 transition duration-150 text-white mb-2">See All Previous Workouts</Link>
            </div>
            <div className="w-[25rem] rounded-lg bg-gray-200 text-center text-lg p-2">
                <div className="m-2">
                    <label htmlFor="dropdown" className="mr-2 font-serif" >Select a Muscle Group</label>
                    <select
                        id="dropdown"
                        value={workout}
                        onChange={dropDownHandler}
                        className="border rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-500 font-serif"
                    >
                        {workout_data.map((workout_data) => (
                            <option key={workout_data} value={workout_data} className="font-serif">
                                {workout_data}
                            </option>
                        ))}
                    </select>
                    <button className="px-2 py-1 ml-2 bg-gray-400 rounded-md font-serif hover:bg-gray-600 hover:text-white transition duration-100" onClick={DeleteHandler}>Delete</button>
                </div>
               { display && <div className="items-center"><WorkOutList list={workoutList} displayListHander={CurrentDisplayDataHandler}/></div>}

            </div>
            <Data workoutData={userData}/>
        </div>
    );
}

export default MainPage;