import { PageProps } from "@/pages";
import Card from "./Card";
import Choice from "./Choice";

export default function MainBody({ page }: PageProps) {
  return (
    <>
      <Choice />
      <Card page={page} />
    </>
  );
}
