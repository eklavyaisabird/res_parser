import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {storage} from "./firebase";
import {ref, uploadBytes, listAll, getDownloadURL, list} from "firebase/storage";
import { v4 } from "uuid"
import { genBitmap } from "./resumeSearch";
import SearchBar from "./components/SearchBar"
import UploadFile from "./components/uploadFile"
import KeyDisplay from "./components/keyDisplay"



function App() {
  

  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [nameDisplay, setNameDisplay] = useState(false);
  const [nameList, setNameList] = useState([]);


  const fileListRef = ref(storage, `files/`)

  const uploadFile = () => {
    if (fileUpload === null) return;
    const fileRef = ref(storage, `files/${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prevFileList) => [...prevFileList, url]);
        setNameList((prevNameList) => [...prevNameList, fileUpload.name]);
      });
    });
  };

  // const uploadFile = () => {
  //   if (fileUpload === null) return;
  //   // const fileRef = ref(storage, `files/${fileUpload.name + v4()}`)
  //   const fileRef = ref(storage, `files/${fileUpload.name}`)
  //   uploadBytes(fileRef, fileUpload).then((snapshot) => {
  //     //alert("File Uploaded")
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setFileList((prev) => [...prev, url]);
  //       setNameList((prev) => [...prev, item.name]);
  //     });
  //   });
  // };

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      const urls = [];
      const names = [];
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          urls.push(url);
          names.push(item.name);
          if (urls.length === response.items.length) {
            setFileList(urls);
            setNameList(names);
          }
        });
      });
    });
  }, []);

  // useEffect(() => {
  //   listAll(fileListRef).then((response) => {
  //     //console.log(response);
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setFileList((prev) => [...prev, url]);

  //         setNameList((prev) => [...prev, item.name]);
  //       })
  //     })
  //   })
  // }, []);



  // hardcoded keywords: 
  let keywords = ['python', 'react', 'data science', 'full-stack'];

  console.log(genBitmap(keywords, fileList));
  const [keyword, setKeyword] = useState("");

  const handleSumbission = (item) => {
    console.log(item)
  }

  return (
    <div className="App">
      <h1 className="header">Resume Finder</h1>

{/* keywords are a horizontal list object */}

{/* // keyword SearchBar
    onSubmit: append keyword to keywords list
    word has to be saved while typed

*/}
<SearchBar value={keyword} onSubmit={() => {
  keywords.push({keyword});
  console.log(keyword);
  handleSumbission;
}} onChange={(e) => setKeyword(e.target.value)}
  />

{/* <p>Keywords:</p>
<div className="btn-group" role="group" aria-label="Basic example">
  {keywords.map((item) => (
    <button type="button" className="btn btn-primary button-space1">{item}</button>
  ))}
</div> */}

    <KeyDisplay keywords={keywords} heading="Keywords:"></KeyDisplay>

      {/* <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload File</button> */}

      <UploadFile onClick={uploadFile} onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}></UploadFile>

        {/* {fileList.map((url) => {
          return <img src={url} />
        })} */}

        <p><button onClick={() => setNameDisplay(true)}>Show Resumes</button></p>

        {nameList.map((name, index) => {
         // console.log(name, index)
          // return <p >{name + index}</p>
          return (nameDisplay && <p><a href={fileList[index]}>{name}</a></p>);
        })}

        {nameDisplay && <p><button onClick={() => setNameDisplay(false)}>Hide</button></p>}


      
    </div>
  );


}

/**node -v
 * 
 * {nameList.map((name, index) => {
          console.log(name, index)
          // return <p >{name + index}</p>
          return <div><a href={fileList[index]}>{name}</a><p /><div/>
        })}
        }
 */

        // export {nameList, fileList};

export default App;
