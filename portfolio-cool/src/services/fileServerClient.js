import streamSaver from 'streamsaver'

export class FileServerCLient {
    constructor(hostname, port) {
        this.hostname = hostname
        this.port = port
    }


    chunkFile(file, bufferSize, lastPos) {
        const fileLength = file.size

        var chunk
        if (fileLength < bufferSize + lastPos) {
            chunk = file.slice(lastPos, fileLength)
        } else {
            chunk = file.slice(lastPos, bufferSize + lastPos)
        }

        return chunk
    }


    async downloadFile(fileId, fileName) {
        let currentBytesRead = 0
        var fileCompleted = false
        let writter = streamSaver.createWriteStream(fileName).getWriter()
        while (!fileCompleted) {

            try {
                
                const request = await fetch(`http://${this.hostname}:${this.port}/files/download/${fileId}`, {
                    method: "GET",
                    headers: {
                        "X-Current-Bytes": `${currentBytesRead}`
                    }
                })


                const headers = request.headers
                const reader = request.body.getReader()


                while (true) {
                    console.log('leyendo')
                    const result = await reader.read()

                    if (result.done) {

                        break
                    }

                    try {
                        await writter.write(result.value);
                        currentBytesRead += result.value.byteLength;
                        result.value = null;
                    } catch (e) {
                        console.log("download failed!")
                        fileCompleted = true
                        await writter.abort(e)
                    }
                            


                }
                reader.releaseLock()
                console.log(headers.get("X-Is-Final"))
                if (headers.get("X-Is-Final") === "true") {
                    console.log('llege al final')
                    fileCompleted = true
                    await writter.close()

                }


            } catch (error) {
                console.error(error)
            }
        }
    }


    async createFolder(folderName, fatherId) {
        try {
            const request = await fetch(`http://${this.hostname}:${this.port}/folders`, {
                method: "POST",
                body: JSON.stringify({
                    folderName: `${folderName}`,
                }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Father-Id": `${fatherId}`,
                }
            })

            const response = await request.json()

            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async sendFile(file, folderId) {
        const bufferSize = 1024 * 1024 * 20
        for (let i = 0; i < file.size; i += bufferSize) {

            //const chunk = this.chunkFile(file, bufferSize, i)
            const chunk = file.slice(i, bufferSize + i)
            //const buffer = await chunk.arrayBuffer()
            try {
                const request = await fetch(`http://${this.hostname}:${this.port}/files`, {
                    method: "POST",
                    body: chunk,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "Content-Size": `${file.size}`,
                        "X-Folder-Id": `${folderId}`,
                        "X-File-Type": "",
                        "X-File-Name": encodeURIComponent(file.name),
                        "X-Is-First-Chunk": `${i === 0}`
                    }
                })

                const response = await request.json()

                console.log(response)
            } catch (error) {
                console.log(error.message)
                console.log("retrying")
                // retry 
                i = i - bufferSize
            }
        }
        console.log("se termino la subida")
    }

    async getFilesByFolder(folderId) {
        try {
            const request = await fetch(`http://${this.hostname}:${this.port}/files/folder/${folderId}`, {
                method: "GET"
            })

            const response = await request.json()
            return response
        } catch (error) {
            console.error(error)
        }
    }

    async getFoldersByFolder(folderId) {
        try {
            const request = await fetch(`http://${this.hostname}:${this.port}/folders/father/${folderId}`, {
                method: "GET"
            })

            const response = await request.json()
            return response
        } catch (error) {
            console.error(error)
        }
    }

    async getFolderById(folderId) {
        try {
            const request = await fetch(`http://${this.hostname}:${this.port}/folders/${folderId}`, {
                method: "GET"
            })

            const response = await request.json()
            return response
        } catch (error) {
            console.error(error)
        }
    }
}