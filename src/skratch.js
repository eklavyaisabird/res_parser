import { filterURLs } from "./pdfjstest.js";

async function FileSet(keyword, fileList) {
    filterURLs(keyword, fileList).then(
      (filteredListofURLS) =>
      {
      console.log("filteredList = ", filteredListofURLS)
      }
    )
    // console.log("fileset filtered: ", filty)    
  }

const reslist = ["https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FResume_AlexanderHamilton.pdf?alt=media&token=77a8172f-1986-44cc-8d0e-e7ddc34e4c1f", "https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FResume_JohnSmith.pdf?alt=media&token=1e588c5e-157a-48f6-84fc-1d19e39d2b41"];
const fileList = reslist;
const keyword = "Python";

(async () => {
  const filteredList = await filterURLs(keyword, fileList);
  FileSet(keyword, fileList);
  console.log("Old Arr:", fileList);
  console.log("New Arr:", filteredList);
  })();