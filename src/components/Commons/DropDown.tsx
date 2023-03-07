import { ChangeEvent } from "react";

interface Category {
  arr: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DropDown = ({ arr, onChange }: Category) => {
  return (
    <>
      <select id="category" onChange={onChange}>
        <option value="">select category</option>
        {arr.map((el) => (
          <option value={el}>{el.toUpperCase()}</option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
