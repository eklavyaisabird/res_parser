import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  keyword: string;
  heading: string;
}

const KeyDisplay = ({ children, keyword, heading }: Props) => {
  return (
    <>
      <p>{heading}</p>
      <div className="btn-group" role="group" aria-label="Basic example">
        {
          <button type="button" className="btn btn-primary button-space1">
            {keyword}
          </button>
        }
      </div>
    </>
  );
};

// const KeyDisplay = ({ children, keywords, heading }: Props) => {
//   return (
//     <>
//       <p>{heading}</p>
//       <div className="btn-group" role="group" aria-label="Basic example">
//         {keywords.map((item) => (
//           <button type="button" className="btn btn-primary button-space1">
//             {item}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// };

export default KeyDisplay;
