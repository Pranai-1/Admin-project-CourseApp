import { useEffect } from "react"
import UpdateCard from "./UpdateCard";
function CourseCard(props){
    console.log("child ")
    return(
<>
    <div  className="h-[300px] w-full bg-indigo-200 flex justify-center items-center mb-[-50px] z-0 flex-wrap">
           
            <div className="text-3xl text-red-700 font-bold ">{ props.course.title}</div>
              <div key={ props.id} className=" bg-indigo-100  h-[250px] w-max rounded-lg ml-[300px]  mt-[100px] grid justify-center ">
              <img className="h-[150px] w-full  object-cover rounded-t-lg" src={ props.course.image} alt="image" />
              <p className="h-max w-full font-bold text-xl text-blue-700 pl-2">{ props.course.title}</p>
              <p className="h-[35px] mt-1 font-medium text-xs pl-2 overflow-auto">{ props.course.description}</p>
              </div>
             
              </div>
             
              </>
    )
}
export default CourseCard