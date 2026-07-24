import { useContext, useEffect, useRef, useState } from "react"
import { FileReader } from "../components/fileServer/fileReader"
import { ftpContext } from "../context/context"
import { FileServerCLient, FtpCLient, ftpClient } from "../services/fileServerClient"
import { FilesDisplayer } from "../components/fileServer/filesDisplayer"
import { FolderCreator } from "../components/fileServer/folderCreator"
import { FolderNavigator } from "../components/fileServer/folderNavigator"

import "./fileServerPage.css"

export function FileServerPage() {

    const [file, setFile] = useState()
    const [folder, setFolder] = useState()
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [currentDirectory, setCurrentDirectory] = useState({ folderId: 1, fatherId: null }) // [convention] 1 is root folder, following numbers are other folders, 0 and negative means nothing

    const [fileServerClient, setFileServerClient] = useState(new FileServerCLient(process.env.REACT_APP_FILESERVER_IP, process.env.REACT_APP_FILESERVER_PORT))


    useEffect(() => {
        let control = {directoryChanged: false}

        const interval = setInterval(() => {
            getFilesAndFoldersOnCurrentDirectory(control)
        },2000)
        return () => {
            control.directoryChanged = true;
            clearInterval(interval);
        };
    }, [currentDirectory.fatherId])

    useEffect(() => {
        if (!file) return
        updateFilesAndFoldersOnResolve(fileServerClient.sendFile(file, currentDirectory.folderId))
    }, [file])


    useEffect(() => {
        if (!folder) return
        updateFilesAndFoldersOnResolve(fileServerClient.createFolder(folder, currentDirectory.folderId))
    }, [folder])


    useEffect(() => {
        getFilesAndFoldersOnCurrentDirectory({directoryChanged: false})
    }, [currentDirectory])

    const getFilesAndFoldersOnCurrentDirectory = async (control) => {

        const folderList = await fileServerClient.getFoldersByFolder(currentDirectory.folderId)
        const fileList = await fileServerClient.getFilesByFolder(currentDirectory.folderId)
        if (!control.directoryChanged) {
            setFolders(folderList)
            setFiles(fileList)
        }
    }

    const updateFilesAndFoldersOnResolve = async (promise) => {
        const resolve = await promise
        
        getFilesAndFoldersOnCurrentDirectory({directoryChanged: false})
    }


    return <>
        <ftpContext.Provider value={{
            file, setFile, folder,
            setFolder,
            files,
            setFiles,
            folders,
            setFolders,
            currentDirectory,
            setCurrentDirectory,
            fileServerClient
        }}>
            <div className="fileServerPageContainer">
                <FolderNavigator></FolderNavigator>
                <FilesDisplayer></FilesDisplayer>
                <div className="fileServerPageButtonsContainer">
                    <div className="fileServerPageButtons">
                    <FileReader></FileReader>
                    <FolderCreator></FolderCreator>
                                        </div>

                </div>
                
            </div>
        </ftpContext.Provider>
    </>
}