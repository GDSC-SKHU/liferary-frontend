import { ChangeEvent } from "react";

interface Category {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DropDownCategory = ({ onChange }: Category) => {
  const categoryList = [
    "cooking",
    "fitness",
    "nonsense",
    "relationship",
    "programming",
    "language",
    "makeup",
    "fashion",
    "leisure",
    "travel",
    "etc",
  ];
  return (
    <>
      <select id="category" onChange={onChange}>
        <option value="">select category</option>
        {categoryList.map((el) => (
          <option value={el} key={el}>
            {el.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDownCategory;
