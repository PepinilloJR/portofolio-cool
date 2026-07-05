export class FtpCLient {
    constructor(hostname, port, streamPort) {
        this.hostname = hostname
        this.port = port
        this.streamPort = streamPort
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


    async sendFile(file) {
        const bufferSize = 1024 * 1024 * 20
        for (let i = 0; i < file.size; i += bufferSize) {

            const chunk = this.chunkFile(file, bufferSize, i)
            const buffer = await chunk.arrayBuffer()
            try {
                const request = await fetch(`http://${this.hostname}:${this.streamPort}/files`, {
                    method: "POST",
                    body: buffer,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "Content-Size": `${file.size}`,
                        "Content-Disposition": `attachment; filename=${file.name}`,
                        "X-Upload-Path": ""
                    }
                })

                const response = await request.json()

                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
    }
}