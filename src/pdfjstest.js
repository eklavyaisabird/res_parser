// // vvv for running code in terminal
// import pkg from 'pdfjs-dist';
// const { getDocument, GlobalWorkerOptions } = pkg;

// vvv for running app in browser
 import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

 GlobalWorkerOptions.workerSrc = './pdf.worker.js';

export async function getContent(src) {
    const doc = await getDocument(src).promise;
    const page = await doc.getPage(1);

    const content = await page.getTextContent();

    const items = content.items.map(item => item.str);
    const text = items.join(' '); // Join all the items into a single string
    return text;
  }


export async function checkPDF(word, src) {
  console.log("Checking PDF....")
    const text = await getContent(src);
    const inPDF = text.includes(word);
    console.log("DONE Checking PDF....", inPDF);
    return inPDF;
}

export async function wordInPDF(word, src) {
    return checkPDF(word, src) ? 1 : 0
}

export async function genBitmap(word, urlArray) {

  const bitArr = [];

  for (let i = 0, len = urlArray.length; i < len; i++) {
    bitArr.push(await checkPDF(word, urlArray[i]) ? 1 : 0)
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

// const reslist = ["/Users/eklavyamishra/Desktop/Resumes/Resume_JohnSmith.pdf", "/Users/eklavyamishra/Desktop/Resumes/Resume_AlexanderHamilton.pdf", "/Users/eklavyamishra/Desktop/Resumes/resume (3).pdf"];
// const fileList = reslist;
// const keyword = "Python";

// (async () => {
//   const filteredList = await filterURLs(keyword, fileList);
//   console.log("Old Arr:", fileList);
//   console.log("New Arr:", filteredList);

//   // for (let i = 0, len = reslist.length; i < len; i++) {
//   //   console.log(await checkPDF("", reslist[i]))
//   // }
//   })();
