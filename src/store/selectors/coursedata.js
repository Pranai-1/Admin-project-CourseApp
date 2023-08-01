import { selector } from "recoil";
import { CourseState } from "../atoms/Course";

export const CourseDetails=selector({
    key:'CourseDataState',
    get:({get})=>{
      const state=get(CourseState)
      return state.course
    }
})

export const CourseTitle=selector({
  key:'CourseTitleState',
  get:({get})=>{
    const state=get(CourseState)
    if(state.course!=null){
    return state.course.title
    }
  }
})

export const CourseDescription=selector({
  key:'CourseDescriptionState',
  get:({get})=>{
    const state=get(CourseState)
    if(state.course!=null){
    return state.course.description
    }
  }
})

export const CourseImage=selector({
  key:'CourseImageState',
  get:({get})=>{
    const state=get(CourseState)
    if(state.course!=null){
    return state.course.image
    }
  }
})

export const CoursePrice=selector({
  key:'CoursePriceState',
  get:({get})=>{
    const state=get(CourseState)
    if(state.course!=null){
    return state.course.price
    }
  }
})

export const CoursePublished=({
  key:'CoursePublishedState',
  get:({get})=>{
    const state=get(CourseState)
    if(state.course!=null){
    return state.course.published
    }
  }
})