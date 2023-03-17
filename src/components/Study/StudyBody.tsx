import { QueryProps } from "@/types";
import StudyForm from "./StudyForm";

export default function StudyBody({ id }: QueryProps) {
  return (
    <>
      <StudyForm id={id} />
    </>
  );
}
