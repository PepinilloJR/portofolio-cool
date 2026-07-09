import { useContext, useRef } from "react"
import { ftpContext } from "../context/context"

export function FolderCreator() {
    const { folder, setFolder } = useContext(ftpContext)
    const folderNameRef = useRef()


    
    return <div>
        <input ref={folderNameRef} type="text"></input>
        <button onClick={() => {
            if(folderNameRef.current.value && folderNameRef.current.value !== "") {
                setFolder(folderNameRef.current.value)
            }
        }}>Create new folder</button>

    </div>
}