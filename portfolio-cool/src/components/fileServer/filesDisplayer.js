import { useContext } from "react";
import { ftpContext } from "../../context/context";
import "./filesDisplayer.css"
import { FaFolder } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
export function FilesDisplayer() {
    const { file, setFile, files, setFiles, folders, setFolders, currentDirectory, setCurrentDirectory, fileServerClient } = useContext(ftpContext)


    return <div className="filesGrid">
            {
                folders?.map((f, key) => {
                    return <div key={key} onClick={() => {
                        setCurrentDirectory({folderId: f.folderId, fatherId: f.fatherId})
                    }} className="folder">
                        <FaFolder className="folderIcon"></FaFolder>
                        <p className="folderTitle">{f.folderName}</p>
                    </div>

                })
            }

            {

                files?.map((f, key) => {
                    return <div key={key} onClick={() => {
                        //fileServerClient.downloadFile(f.id, f.name)
                    }} className="file">
                        <a href={`http://${fileServerClient.hostname}:${fileServerClient.port}/files/download/${f.id}`}><FaFileAlt className="fileIcon"></FaFileAlt></a>
                        <p className="fileTitle">{f.name}</p>
                    </div>

                })
            }


        </div>

}