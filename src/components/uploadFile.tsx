import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onChange: () => void;
  onClick: () => void;
}

const UploadFile = ({ children, onChange, onClick }: Props) => {
  return (
    <>
      <input type="file" onChange={onChange} />
      <button onClick={onClick}>Upload File</button>
    </>
  );
};

export default UploadFile;
