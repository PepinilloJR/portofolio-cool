import { useContext, useEffect, useRef, useState } from "react"
import { FileReader } from "../components/fileReader"
import { ftpContext } from "../context/context"
import { FtpCLient, ftpClient } from "../services/ftpClient"
import { FilesDisplayer } from "../components/filesDisplayer"
import { FolderCreator } from "../components/folderCreator"
export function FtpPage() {

    const [file, setFile] = useState()
    const [folder, setFolder] = useState()
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [currentDirectory, setCurrentDirectory] = useState(1) // [convention] 1 is root folder, following numbers are other folders, 0 and negative means nothing
    
    const [ftpClient, setFtpClient] = useState(new FtpCLient(process.env.REACT_APP_FILESERVER_IP, process.env.REACT_APP_FILESERVER_PORT))

    useEffect(() => {
        if (!file) return
        console.log(file)
        ftpClient.sendFile(file, currentDirectory)
    }, [file])

    useEffect(() => {
        if (!folder) return
        console.log(folder)
        ftpClient.createFolder(folder, currentDirectory)
    }, [folder])

    useEffect(() => {
        getFilesAndFoldersOnCurrentDirectory()
    }, [currentDirectory])

    const getFilesAndFoldersOnCurrentDirectory = async () => {
        const folderList = await ftpClient.getFoldersByFolder(currentDirectory)
        const fileList = await ftpClient.getFilesByFolder(currentDirectory)
        setFolders(folderList)
        setFiles(fileList)
    }

    return <>
        <ftpContext.Provider value={{
            file, setFile, folder, setFolder, files, setFiles, folders, setFolders, currentDirectory, setCurrentDirectory, ftpClient
        }}>
            <div>
                <FilesDisplayer></FilesDisplayer>
                <FileReader></FileReader>
                <FolderCreator></FolderCreator>
            </div>
        </ftpContext.Provider>
    </>
}