import { ChangeEvent } from "react";

interface Category {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentCategory?: string;
}

const DropDownCategory = ({ onChange, currentCategory }: Category) => {
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
    "music",
    "etc",
  ];

  return (
    <>
      <select
        id="category"
        onChange={onChange}
        defaultValue={currentCategory?.toLocaleLowerCase()}
      >
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
