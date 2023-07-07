// import { pdfjsLib, getDocument } from "pdfjs-dist";
//const pdfjsLib = require("pdfjs-dist/legacy/build/pdf"); 
// PROBLEM WITH GET DOCUMENT
// var pdfjsLib = window['pdfjs-dist/build/pdf'];
// import { pdfjs } from "pdfjs-dist/legacy/build/pdf";
// import { pdfjs } from "pdfjs-dist/webpack";
// import { pdfjs } from "pdfjs-dist/build/pdf";

// import pkg from 'pdfjs-dist/build/pdf.js';
// const { getDocument } = pkg;

// import { getDocument } from 'pdfjs-dist/build/pdf.js';

import { getDocument } from 'pdfjs-dist';

// import { GlobalWorkerOptions } from "pdfjs-dist/webpack";

// pdfjsLib.GlobalWorkerOptions.workerSrc = 'src/pdf.worker.js'; // Initialize the worker source path


async function getContent(src) {
    const doc = await getDocument(src).promise
    const page = await doc.getPage(1)
    return await page.getTextContent()
}

async function getString(src) {
    let string = ''
    const content = await getContent(src)
    const items = content.items.map((item) => {
        string = string + item.str
    }
    )
    return string;
}

// async function checkWord(word, text) {
//     return text.includes(word)
// }

async function checkWord(word, src) {
    const text = await getString(src);
    return text.str.includes(word) ? 1 : 0
}

async function genBitmap(wordArray, urlArray) {
    let s = '';
    const bitArr = await Promise.all(urlArray.map(((url) => {
        wordArray.map((word) => checkWord(word, url));
    })))

    return bitArr;
}

// async function genBitmap(wordArray, urlArray) {
//     let s = '';
//     const bitArr = urlArray.map(((url) => {
//         s = getString(url);
//         wordArray.array.forEach(element => {
//             if checkWord()
//         });
//     }))
// }


// async function genBitmap(wordArray, urlArray) {
//     let s = '';
//     let bitArr = []
//     urlArray.array.forEach(element => {
//         s = getString(element)
//         wordArray.forEach((item) => {
//             if checkWord(item, s)
//         })
        
//         checkWord()
//     });
// }



export {genBitmap};