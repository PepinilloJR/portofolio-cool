import { useContext } from "react";
import { ftpContext } from "../context/context";


export function FilesDisplayer() {
    const { file, setFile, files, setFiles, folders, setFolders, currentDirectory, setCurrentDirectory, ftpClient } = useContext(ftpContext)


    return <div>
        <div className="filesGrid">
            {
                folders?.map((f, key) => {
                    return <div key={key} onClick={() => {
                        setCurrentDirectory(f.folderId)
                    }} className="folder">
                        {f.folderName}
                    </div>

                })
            }

            {

                files?.map((f, key) => {
                    return <div key={key} onClick={() => {
                        ftpClient.downloadFile(f.id, f.name)
                    }} className="file">
                        {f.name}
                    </div>

                })
            }


        </div>
    </div>

}