import streamSaver from 'streamsaver'

export class FtpCLient {
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


        let writableFileStream = streamSaver.createWriteStream(fileName).getWriter();
        let writableStream = new WritableStream(
            {
                write(chunk) {
                    currentBytesRead += chunk.length
                    return writableFileStream.write(chunk)
                },
                close() {
                    console.log('Download completed!');
                    fileCompleted = true
                    return writableFileStream.close();
                },
                abort(err) {
                    console.error('Download failed:', err);
                    fileCompleted = true
                    return writableFileStream.abort(err);
                },
            }
        )

        let writter = writableStream.getWriter()
        while (!fileCompleted) {

            try {
                const request = await fetch(`http://${this.hostname}:${this.port}/files/download/${fileId}`, {
                    method: "GET",
                    headers: {
                        "X-Current-Bytes": `${currentBytesRead}`
                    }
                })

                const response = await request.json()
                console.log(response)
                const binary = atob(response.chunk) // being json the fetch converts it to base64

                const chunk = new Uint8Array(binary.length);

                for (let i = 0; i < binary.length; i++) {
                    chunk[i] = binary.charCodeAt(i);
                }
                await writter.write(chunk)
                if (response.isLastChunk) {
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

            const chunk = this.chunkFile(file, bufferSize, i)
            const buffer = await chunk.arrayBuffer()
            try {
                const request = await fetch(`http://${this.hostname}:${this.port}/files`, {
                    method: "POST",
                    body: JSON.stringify({
                        "fileName": `${file.name}`,
                        buffer: Array.from(new Uint8Array(buffer)),
                        isFirstChunk: i === 0

                    }
                    ), // i cannot send raw bytes into stringify
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Size": `${file.size}`,
                        "X-Folder-Id": `${folderId}`,
                        "X-File-Type": ""
                    }
                })

                const response = await request.json()

                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
    }

    async getFilesByFolder(folderId) {
        try {
            const request = await fetch(`http://${this.hostname}:${this.port}/files/folder/${folderId}`, {
                method: "GET"
            })

            const response = await request.json()

            console.log(response)
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

            console.log(response)
            return response
        } catch (error) {
            console.error(error)
        }
    }
}