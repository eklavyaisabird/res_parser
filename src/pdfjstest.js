//  import { getDocument } from "pdfjs-dist/build/pdf.js";

// import pkg from 'pdfjs-dist/build/pdf.js';
// const { getDocument } = pkg;

// import pkg from 'pdfjs-dist';
// const { getDocument } = pkg;

 import { getDocument } from "pdfjs-dist";


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

const pdflink = "https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e";


(async () => {
    const result = await checkPDF("kid", pdflink);
    console.log(result);
  })();

// console.log(await checkPDF("kid", "https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e"))
// getString("https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e")

// export {checkPDF, wordInPDF, getContent};