import { useState } from "react";

interface Props {
   list: any[]
   displayListHander?: any
}

const WorkOutList: React.FC<Props> = (props) => {
   const workoutList = props.list
   console.log(workoutList)
   const [DisplayList, setDisplayList] = useState();
   const onClickHanlder = (event: any) => {
      let obj = {}
         for(let x= 0; x < workoutList.length; x++){
            if(workoutList[x].name === event.target.value){
               obj = {
                  'name' : workoutList[x].name,
                  'Calorie_Count' : workoutList[x].calorie_count
               }
            }
         }
         props.displayListHander(obj)
   }
   return (
      <div className="grid grid-cols-2 gap-2">
        {workoutList.map((workout_data) => (
          <button
            key={workout_data.name} 
            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-100"
          onClick={onClickHanlder}
          value={workout_data.name}>
            {workout_data.name}
          </button>
        ))}
      </div>
    );
    
}

export default WorkOutList;