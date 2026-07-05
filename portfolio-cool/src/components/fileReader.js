import { useContext, useRef } from "react"
import { ftpContext } from "../context/context"

export function FileReader() {

    const { file, setFile } = useContext(ftpContext)
    const fileRef = useRef()

    const handleFile = async () => {

        setFile(fileRef.current.files[0])
    }

       
    return <div>
            <input ref={fileRef} onChange={handleFile} type="file"></input>
        </div>

}