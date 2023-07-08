import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  nameList: string[];
  fileList: string[];
  nameDisplay: boolean;
  setNameDisplay: () => void;
  onShow: () => void;
  onHide: () => void;
}

const ResDisplay = ({
  children,
  nameList,
  fileList,
  onShow,
  nameDisplay,
  onHide,
}: Props) => {
  return (
    <>
      <p>
        <button onClick={onShow}>Show Resumes</button>
      </p>

      {nameList.map((name, index) => {
        return (
          nameDisplay && (
            <p key={index}>
              <a href={fileList[index]}>{name}</a>
            </p>
          )
        );
      })}

      {nameDisplay && (
        <p>
          <button onClick={onHide}>Hide</button>
        </p>
      )}
    </>
  );
};

export default ResDisplay;
