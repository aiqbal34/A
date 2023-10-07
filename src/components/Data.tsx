interface props {
    workoutData: any[];
  }
  
  const Data: React.FC<props> = (props) => {
    const list: any[] = props.workoutData;
    let calorieCount = 0
    for(let x = 0; x < list.length; x++){
        calorieCount += list[x].Calorie_Count
    }
    return (
      <div className="p-2 items-center">
        <div className="border-2 text-center rounded-md bg-gray-200 mb-2 px-2 py-1">
        <p className=" font-serif">Total approx. calorie count: {calorieCount}</p>
        </div>
        <div className="grid grid-cols-4 gap-2 ">
          {list.map((data) => (
              <div className="bg-gray-200 border border-gray-300 flex flex-col items-center justify-center rounded-md p-2">
                <div className="text-sm font-medium font-serif">{data.name}</div>
                <div className="text-xl font-bold font-serif">{data.Calorie_Count}</div>
              </div>  
          ))}
        </div>{" "}
      </div>
    );
  };
  
export default Data;