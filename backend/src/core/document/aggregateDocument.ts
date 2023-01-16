import DocumentModel from "../models/document.model";

export default function(document: DocumentModel) {
    return Object.assign(document, {
       url: "http://localhost:3000/" + document.path.replace(/\\/g, "/")
    });
}