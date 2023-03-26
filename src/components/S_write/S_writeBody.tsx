import S_writeForm from "./S_writeForm";
import { MainCategoryProps } from "@/pages/s_write";
export default function S_writeBody({ currentCategory }: MainCategoryProps) {
  return (
    <>
      <S_writeForm currentCategory={currentCategory} />
    </>
  );
}
