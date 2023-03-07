import S_editForm from "./S_editForm";
import { UpdateProps } from "@/pages/s_edit";

export default function S_editBody({ id }: UpdateProps) {
  return (
    <>
      <S_editForm id={id} />
    </>
  );
}
