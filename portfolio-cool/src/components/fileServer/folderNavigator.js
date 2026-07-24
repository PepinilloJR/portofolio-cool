import { useContext, useEffect, useState } from "react";
import { ftpContext } from "../../context/context";
import { TbArrowBackUp } from "react-icons/tb";
import "./folderNavigator.css"
export function FolderNavigator() {

    const { currentDirectory, setCurrentDirectory, fileServerClient} = useContext(ftpContext);

    const obtainFatherDirectory = async () => {
        const fatherDirectory = await fileServerClient.getFolderById(currentDirectory.fatherId);
        console.log(fatherDirectory)
        setCurrentDirectory({folderId: fatherDirectory.folderId, fatherId: fatherDirectory.fatherId})
    }

    return <div className="folderNavigatorButtonContainer">
        <button className="folderNavigatorButton" onClick={() => {
            if (currentDirectory.fatherId) {
                obtainFatherDirectory()
            }
        }
        }><TbArrowBackUp className={currentDirectory.fatherId ? "folderNavigatorIcon": "folderNavigatorIconDisabled"}></TbArrowBackUp></button>

    </div>


}