import Nav from "@/components/Nav/Nav";
import StudyBody from "@/components/Study/StudyBody";
import { ShareProps } from "./share";

export default function Study({ id }: ShareProps) {
  return (
    <>
      <Nav />
      <StudyBody id={id} />
    </>
  );
}
