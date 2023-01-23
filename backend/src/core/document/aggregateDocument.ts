import DocumentModel from "../models/document.model";
import {serverDomain} from "../../../config";


export default function(document: DocumentModel) {
    return Object.assign(document, {
       url: serverDomain + "/" + document.path.replace(/\\/g, "/")
    });
}