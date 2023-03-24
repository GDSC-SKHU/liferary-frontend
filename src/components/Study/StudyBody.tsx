import StudyForm from "./StudyForm";
import { StudyProps } from "@/pages/study";

export default function StudyBody({ id }: StudyProps) {
  return (
    <>
      <StudyForm id={id} />
    </>
  );
}
