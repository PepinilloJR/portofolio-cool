import { useContext, useRef } from "react"
import { ftpContext } from "../../context/context"

import "./folderCreator.css"
import { FaFolderPlus } from "react-icons/fa";
export function FolderCreator() {
    const { folder, setFolder } = useContext(ftpContext)
    const folderNameRef = useRef()


    
    return <> <div className="folderCreatorContainer">
        <button className="folderCreatorButton" onClick={() => {
            if(folderNameRef.current.value && folderNameRef.current.value !== "") {
                setFolder(folderNameRef.current.value)
            }
        }}><FaFolderPlus className="folderCreatorButtonIcon"></FaFolderPlus></button>

        </div>
        <div className="folderCreatorInputContainer">

        <input id="folderCreator" ref={folderNameRef} type="text"></input>
        </div>
    </>
}