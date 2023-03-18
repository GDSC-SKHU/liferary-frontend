import { StudyProps } from "@/pages/study";
import StudyForm from "./StudyForm";

export default function StudyBody({ id }: StudyProps) {
  return (
    <>
      <StudyForm id={id} />
    </>
  );
}
