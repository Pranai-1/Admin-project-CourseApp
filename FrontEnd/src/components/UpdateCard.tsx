import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CourseDetails } from "../store/selectors/coursedata";
import { CourseState } from "../store/atoms/Course";

function UpdateCard(props:{id:string}) {
  const courseState = useSetRecoilState(CourseState);
  const courseDetails = useRecoilValue(CourseDetails);
  // In this case, courseDetails is obtained from useRecoilValue(CourseDetails),
  //  which also provides the current value of the Recoil selector CourseDetails. 
  //  However, instead of using courseDetails directly, it extracts the title property
  //   and initializes the title state with that value. The potential issue here is 
  //   that courseDetails might not have the latest value available at the time of rendering.
  //    Recoil selectors are synchronous but can depend on asynchronous operations or external data
  //     sources, which might cause a delay in updating the value.





//   const courseTitle = useRecoilValue(CourseTitle); const [title, setTitle] = useState(courseTitle);
// In the case of courseTitle is directly obtained from useRecoilValue(CourseTitle),
//  which provides the current value of the Recoil selector CourseTitle. 
//  Since useRecoilValue is synchronous and returns the current value immediately, 
//  this approach will work correctly, and title will be initialized with the latest 
//  value of CourseTitle at the time of rendering.


  if(courseDetails===null){
       return(
        <>
        <h1>Nothing to show</h1>
        </>
       )
  }
  const [title, setTitle] = useState(courseDetails.title);
  const [description, setDescription] = useState(courseDetails.description);
  const [price, setPrice] = useState(courseDetails.price);
  const [image, setImage] = useState(courseDetails.image);
  const [published, setPublished] = useState(courseDetails.published);
  useEffect(() => {
    setTitle(courseDetails.title);
    setDescription(courseDetails.description);
    setPrice(courseDetails.price);
    setImage(courseDetails.image);
    setPublished(courseDetails.published);
  }, [courseDetails]);

  
  async function Submit() {
    let token = localStorage.getItem('token');
    try {
      const res = await axios.post(`http://localhost:3000/admin/courses/${props.id}`, {
        title: title,
        description: description,
        price: +price,
        image: image,
        published: published
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.data.message === 'success') {
        courseState(prevState => ({
          ...prevState,
          course: {
            ...prevState.course,
            title: title,
            description:description,
            price: +price,
            image: image,
            published: published,
          }
        }))
        alert('Course Updated');
      } else {
        alert('Updation failed');
      }
    } catch (error) {
      // Handle error if something goes wrong with the request
      console.error("Error updating course:", error);
    }
  }
  

  return (
    <>
      <div className="flex justify-center items-center flex-wrap mt-[-150px]">
        <div className="grid border-2 border-solid border-blue-500 rounded mt-5 mr-[500px] p-3 z-10 bg-white">
          <p className="text-m font-medium text-blue-600 flex justify-center">Update Course Details</p>
          <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-[400px] border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2" />
          <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2" />
          <input type="number" placeholder="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2" />
          <input type="text" placeholder="image url" value={image} onChange={(e) => setImage(e.target.value)} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2" />
          <input type="text" placeholder="published" value={published.toString()} onChange={(e) => setPublished(e.target.value=="true")} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2" />
          <button onClick={Submit} className="h-max w-full bg-indigo-700 text-white font-bold text-xm p-1 rounded m-1 hover:bg-indigo-800">Submit</button>
        </div>
      </div>
    </>
  );
}

export default UpdateCard;
