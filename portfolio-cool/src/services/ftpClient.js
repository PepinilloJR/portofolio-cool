export class FtpCLient {
    constructor(hostname, port, streamPort) {
        this.hostname = hostname
        this.port = port
        this.streamPort = streamPort
    }

    async sendFile(file) {

        try {
        const request = await fetch(`http://${this.hostname}:${this.streamPort}/post`, {
            method: "POST",
            body: file,
            headers: {
                "Content-Type": file.type,
                "Content-Size": `${file.size}`,
                "Content-Disposition": `attachment; filename=${file.name}`
            }
        })

        const response = await request.json()

        console.log(response)
    } catch (error) {
        console.error(error)
    }
    }
}