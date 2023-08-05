import { atom } from "recoil";

interface Course {
  title: string;
  description: string;
  price: number;
  image: string;
  published: boolean;
}

interface Coursestate {
  course: Course | null;
}

export const CourseState = atom<Coursestate>({
  key: 'CourseState',
  default: {
    course: null
  }
});
