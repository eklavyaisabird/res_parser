import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {storage, db} from "./firebase";
import {ref, uploadBytes, listAll, getDownloadURL, list} from "firebase/storage";
import { v4 } from "uuid"
import { genBitmap } from "./resumeSearch";
import SearchBar from "./components/searchBar"
import UploadFile from "./components/uploadFile"
import KeyDisplay from "./components/keyDisplay"
import ResDisplay from "./components/resDisplay"




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

  const [nameUpload, setNameUpload] = useState(null);

  const uploadWord = () => {

  }


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

  // hardcoded keywords: 
  // let keyword = 'react';

  // console.log(genBitmap(keywords, fileList));
  const [keyword, setKeyword] = useState("");
  const [submittedWord, setSubmittedWord] = useState("");

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
    <SearchBar value={keyword} onSubmit={(e) => {
      // keywords.push({keyword});
      setSubmittedWord(keyword)
      console.log(keyword);
      handleSumbission;
      e.preventDefault();
      }} onChange={(e) => setKeyword(e.target.value)} />


        <KeyDisplay keyword={submittedWord} heading="Keyword:"></KeyDisplay>

          <UploadFile onClick={uploadFile} onChange={(event) => {
              setFileUpload(event.target.files[0]);
              
            }}></UploadFile>

            {/* <p><button onClick={() => setNameDisplay(true)}>Show Resumes</button></p>

            {nameList.map((name, index) => {
            // console.log(name, index)
              // return <p >{name + index}</p>
              return (nameDisplay && <p><a href={fileList[index]}>{name}</a></p>);
            })}

            {nameDisplay && <p><button onClick={() => setNameDisplay(false)}>Hide</button></p>} */}

            <ResDisplay nameDisplay={nameDisplay} nameList={nameList} fileList={fileList} onShow={() => setNameDisplay(true)} onHide={() => setNameDisplay(false)}></ResDisplay>


          
        </div>
  );


}


export default App;
