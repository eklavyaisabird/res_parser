import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onUpload: () => void;
  onClick: () => void;
}

const UploadFile = ({ children, onUpload, onClick }: Props) => {
  return (
    <>
      <input type="file" onChange={onUpload} />
      <button onClick={onClick}>Upload File</button>
    </>
  );
};

export default UploadFile;
