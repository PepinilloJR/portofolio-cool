import { useContext, useEffect, useRef, useState } from "react"
import { FileReader } from "../components/fileReader"
import { ftpContext } from "../context/context"
import { FtpCLient, ftpClient } from "../services/ftpClient"
export function FtpPage() {

    const [file, setFile] = useState() 

    useEffect(() => {
        if (!file) return 
        console.log(file)
        const ftpClient = new FtpCLient("localhost", "21", "8081")
        ftpClient.sendFile(file)
    }, [file])

    return <>
        <ftpContext.Provider value={{
            file, setFile
        }}>
            <div>
                <FileReader></FileReader>
            </div>
        </ftpContext.Provider>
    </>
}