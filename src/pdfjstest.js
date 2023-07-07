//  import { getDocument } from "pdfjs-dist/build/pdf.js";
import pkg from 'pdfjs-dist/build/pdf.js';
const { getDocument } = pkg;

// const pdfjs = require("pdfjs-dist/build/pdf")

async function getContent(src) {
    const doc = await getDocument(src).promise
    const page = await doc.getPage(1)
    return await page.getTextContent()
}

async function getString(src) {
    const content = await getContent(src)
    const items = content.items.map((item) => {
        console.log(item.str)
    }
    )
    return items;
}

getString("https://firebasestorage.googleapis.com/v0/b/project1js-16740.appspot.com/o/files%2FPHD_EklavyaMishra.pdf?alt=media&token=59cef17d-1c8b-463a-a125-4e39ebc5d13e")