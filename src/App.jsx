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
    setFilteredFiles(["HANDLED"]);
  }

  const [filteredFiles, setFilteredFiles] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  const [bitmap, setBitmap] = useState([]);

    async function FileSet(keyword, fileList) {
      console.log("setting files...")
      filterURLs(keyword, fileList).then(
        (filty) =>
        {
        console.log("FILTY = ", filty)
        }
      )
      console.log("done setting files")
      console.log("fileset filtered: ", filteredFiles)
      // setFilteredFiles(["something2222?"])
      console.log("fileset filtered2: ", filteredFiles)
      
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
      // handleSumbission(keyword);
      e.preventDefault();
      // setFilteredFiles(["AAAAAA"]);
      // filterURLs(keyword, fileList).then(
      //   (filty) => {setFilteredFiles(filty)}
      // )
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
