import { useContext, useRef } from "react"
import { ftpContext } from "../../context/context"
import { FaFileUpload } from "react-icons/fa";

import "./fileReader.css"
export function FileReader() {

    const { file, setFile } = useContext(ftpContext)
    const fileRef = useRef()

    const handleFile = async () => {

        setFile(fileRef.current.files[0])
    }

       
    return <div className="fileUploadContainer">
            <label htmlFor="fileUpload" className="fileUploadLabel"><FaFileUpload className="fileUploadIcon"></FaFileUpload></label>
            <input id="fileUpload" ref={fileRef} onChange={handleFile} type="file"></input>
        </div>

}