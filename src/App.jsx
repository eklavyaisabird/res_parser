import { useState, useEffect } from "react";
import "./App.css";
import {storage} from "./firebase";
import {ref, uploadBytes, listAll, getDownloadURL, list} from "firebase/storage";
import SearchBar from "./components/searchBar"
import UploadFile from "./components/uploadFile"
import KeyDisplay from "./components/keyDisplay"
import ResDisplay from "./components/resDisplay"
import { wordInPDF, genBitmap, filterURLs, filterNAMEs } from "./pdfjstest.js";
import { Fragment } from "react";

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
        console.log("file uploaded");
      });
    });
  };
// could potentially implement filtration here in the useeffect
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

  const [keyword, setKeyword] = useState("");
  const [submittedWord, setSubmittedWord] = useState("");

  const handleSumbission = (item) => {
    console.log("submission handled: ", item)
  }

  const [filteredFiles, setFilteredFiles] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  const [bitmap, setBitmap] = useState([]);

  // useEffect(() => {
  //   createfilteredlists(keyword, fileList);
  // }, [keyword, fileList, nameList]);

//   async function createfilteredlists(keyword, fileList) {
//     console.log("GABAGOOL");
//     console.log("A fileList: ", fileList);
//     console.log("A keyword: ", keyword);

//     // set filtered lists based on bitmap
//     genBitmap(keyword, fileList).then((bitArray) => {
//     console.log("WHAT IS GOING ON");

//     console.log("B fileList: ", fileList);
//     console.log("B BITMAP: ", bitArray);
    
//     const newFilteredFiles = fileList.filter((_, i) => bitArray[i]);
//     const newFilteredNames = nameList.filter((_, i) => bitArray[i]);

//     setFilteredFiles(newFilteredFiles);
//     setFilteredNames(newFilteredNames);
//   })
//   .catch((error) => {
//     console.error("Error occurred:", error);
//   });
// }

  // async function createfilteredlists(keyword, fileList) {
  //   console.log("GABAGOOL");
  //   console.log("A fileList: ", fileList);
  //   console.log("A keyword: ", keyword);

  //   // set filtered lists based on bitmap
  //   const bitArray = await genBitmap(keyword, fileList);
  //   console.log("WHAT IS GOING ON");

  //   console.log("B fileList: ", fileList);
  //   console.log("B BITMAP: ", bitArray);
    
  //   const newFilteredFiles = fileList.filter((_, i) => bitArray[i]);
  //   const newFilteredNames = nameList.filter((_, i) => bitArray[i]);

  //   setFilteredFiles(newFilteredFiles);
  //   setFilteredNames(newFilteredNames);
  // }

  // const filteredFiles = [];
  // const filteredNames = [];

  // // const [filteredFiles, setFilteredFiles] = useState([]);
  // // const [filteredNames, setFilteredNames] = useState([]);

  // async function createfilteredlists() {
  //   // set filtered lists based on bitmap
  //   const bitArray = await genBitmap(keyword, fileList);
  //   console.log("fileList: ", fileList)
  //   console.log("bitarray: ", bitArray)
  //   for (let i = 0, len = bitArray.length; i < len; i++) {
  //     if (bitArray[i] ){
  //     filteredFiles.push(fileList[i]);
  //     filteredNames.push(nameList[i]);
  //   }
  //   }
  //   console.log("Alrighty then")
  //   console.log(filteredFiles)
  // }

  // useEffect(() => {
  //   if (fileUpload) {
  //     createfilteredlists();
  //   }
  // }, [fileUpload]);

// // unexpected await error
//   const bitArray = genBitmap(keyword, fileList);
  // filtered lists are appended to based on bitmap
    // for (let i = 0, len = bitArray.length; i < len; i++) {
    //   filteredFiles.push(bitArray[i] && fileList);
    //   filteredNames.push(bitArray[i] && nameList);
    // }

    // async function FileSet(keyword, fileList) {
    //   console.log("setting files...")
    //   setFilteredFiles(await filterURLs(keyword, fileList));
    //   console.log("done setting files")
    // }

    async function FileSet(keyword, fileList) {
      console.log("setting files...")
      filterURLs(keyword, fileList).then(
        setFilteredFiles(["something?"])
      )
      console.log("done setting files")
      console.log("filtered: ", filteredFiles)
      setFilteredFiles(["something?"])
      console.log("filtered2: ", filteredFiles)
      
    }

    async function NameSet(keyword, fileList, nameList) {
      console.log("setting names...")
      setFilteredNames(await filterNAMEs(keyword, fileList, nameList));
      console.log("done setting files")
    }

  
  return (
    <div className="App">
      <h1 className="header">Resume Finder</h1>

    <SearchBar value={keyword} onSubmit={(e) => {
      // keywords.push({keyword});
      setSubmittedWord(keyword)
      // createfilteredlists(keyword, fileList);

      // setFilteredFiles(async () => {await filterURLs(keyword, fileList)})
      // setFilteredNames(async () => {await filterNAMEs(keyword, fileList, nameList)})

      FileSet(keyword, fileList);
      NameSet(keyword, fileList, nameList);

      console.log("--", keyword);
      handleSumbission(keyword);
      e.preventDefault();
      console.log("--fileList: ", fileList);
      console.log("--filteredList: ", filteredFiles);
      console.log("--filteredNAMES: ", filteredNames);
}} onChange={(e) => setKeyword(e.target.value)} />


        <KeyDisplay keyword={submittedWord} heading="Keyword:"></KeyDisplay>

          <UploadFile onClick={uploadFile} onChange={(event) => {
              setFileUpload(event.target.files[0]);
            }}></UploadFile>

            <ResDisplay nameDisplay={nameDisplay} nameList={filteredNames} fileList={filteredFiles} onShow={() => setNameDisplay(true)} onHide={() => setNameDisplay(false)}></ResDisplay>
            {/* <ResDisplay nameDisplay={nameDisplay} nameList={nameList} fileList={fileList} onShow={() => setNameDisplay(true)} onHide={() => setNameDisplay(false)}></ResDisplay> */}
          
        </div>
  );


}


export default App;
