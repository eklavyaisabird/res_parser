//  import { getDocument } from "pdfjs-dist/build/pdf.js";

// import pkg from 'pdfjs-dist/build/pdf.js';
// const { getDocument } = pkg;

// // vvv for running code in terminal
// import pkg from 'pdfjs-dist';
// const { getDocument, GlobalWorkerOptions } = pkg;

// vvv for running app in browser
 import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";


 GlobalWorkerOptions.workerSrc = './pdf.worker.js';


// const pdfjs = require("pdfjs-dist/build/pdf")

export async function getContent(src) {
    const doc = await getDocument(src).promise;
    const page = await doc.getPage(1);
    const content = await page.getTextContent();
    const items = content.items.map(item => item.str);
    const text = items.join(' '); // Join all the items into a single string
    return text;
  }

// async function getContent(src) {
//     const doc = await getDocument(src).promise
//     const page = await doc.getPage(1)
//     return await page.getTextContent()
// }

// async function getString(src) {
//     const content = await getContent(src)
//     const items = content.items.map((item) => {
//         console.log(item.str)
//     }
//     )
//     return items.str;
// }



export async function checkPDF(word, src) {
    const text = await getContent(src);
    const inPDF = text.includes(word);
    return inPDF;
}

export async function wordInPDF(word, src) {
    return checkPDF(word, src) ? 1 : 0
}

export async function genBitmap(word, urlArray) {

  // const bitArr = await Promise.all(urlArray.map(
  //    (url) => checkPDF(word, url) ? 1 : 0
  //    console.log()
  // ))

  const bitArr = [];

  for (let i = 0, len = urlArray.length; i < len; i++) {
    // console.log(await checkPDF("Python", reslist[i]))
    bitArr.push(await checkPDF(word, urlArray[i]) ? 1 : 0)
    // console.log(word, urlArray[i], i, await checkPDF(word, urlArray[i]))
  }

  return bitArr;
}

export async function filterURLs(word, urlArray) {
  const newFileArr = [];
  for (let i = 0, len = urlArray.length; i < len; i++) {
    if (await checkPDF(word, urlArray[i])) {
      newFileArr.push(urlArray[i]);
    }
  }
  return newFileArr
}

export async function filterNAMEs(word, urlArray, nameArray) {
  const newNameArr = [];
  for (let i = 0, len = urlArray.length; i < len; i++) {
    if (await checkPDF(word, urlArray[i])) {
      newNameArr.push(nameArray[i]);
    }
  }
  return newNameArr
}

//const pdflink = "https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e";
const reslist = ["/Users/eklavyamishra/Desktop/Resumes/Resume_JohnSmith.pdf", "/Users/eklavyamishra/Desktop/Resumes/Resume_AlexanderHamilton.pdf", "/Users/eklavyamishra/Desktop/Resumes/resume (3).pdf"];
const pdflink = reslist[1];
const fileList = reslist;
const keyword = "Python";
(async () => {
    const result = await checkPDF("", pdflink);
    const ba = await genBitmap("", reslist);
    console.log("Bit arr", ba);
    for (let i = 0, len = reslist.length; i < len; i++) {
      console.log(await checkPDF("", reslist[i]))
    }
  })();


  console.log("GABAGOOL");
  console.log("A fileList: ", fileList);
  console.log("A keyword: ", keyword);

  // set filtered lists based on bitmap
  genBitmap(keyword, fileList).then((bitArray) => {
  console.log("WHAT IS GOING ON");

  console.log("B fileList: ", fileList);
  console.log("B BITMAP: ", bitArray);
  
  const newFilteredFiles = fileList.filter((_, i) => bitArray[i]);

  console.log(newFilteredFiles);})

// console.log(await checkPDF("kid", "https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e"))
// getString("https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e")

// export {checkPDF, wordInPDF, getContent};
