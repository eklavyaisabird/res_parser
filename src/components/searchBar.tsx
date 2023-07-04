import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onSubmit: () => void;
  onChange: () => void;
}

const SearchBar = ({ children, onSubmit, onChange }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div>Keywords:</div>
      <input type="text" onChange={onChange} />
      <input type="submit" />
    </form>
  );
};

export default SearchBar;
