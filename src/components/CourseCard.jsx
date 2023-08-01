import { useRecoilValue, useSetRecoilState } from "recoil"
import { CourseTitle, CourseImage, CoursePrice } from "../store/selectors/coursedata"

function CourseCard(props){
  const courseTitle=useRecoilValue(CourseTitle)
  const courseImage=useRecoilValue(CourseImage)
  const coursePrice=useRecoilValue(CoursePrice)
    return(
<>
   
          <div>
              <div key={ props.id} className=" bg-indigo-100  h-max w-[300px]  rounded-lg ml-[1000px]  grid  mt-[-150px] ">
              <img className="h-[150px] w-full  object-cover rounded-t-lg" src={courseImage} alt="image" />
              <p className="h-max w-full font-bold text-xl text-blue-700 pl-2">{ courseTitle}</p>
              <p className="text-xs ml-2">Price Rs.</p>
              <p className="h-[35px] mt-1 font-medium text-xs pl-2 overflow-auto">{ coursePrice}</p>
              </div>
              </div>
              </>
    )
}
export default CourseCard