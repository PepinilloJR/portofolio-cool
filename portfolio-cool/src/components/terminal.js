import { useEffect, useRef, useState } from 'react'
import './terminal.css'
import { AiOutlineException } from 'react-icons/ai'
import { matchPath, useNavigate } from 'react-router'
import { type } from '@testing-library/user-event/dist/type'
import { DirectoryTree } from '../DirectoryTree'

export function Terminal({bufferOutputSetter}) {

    // how should paths work?
    // well, for instance, scanning the document for IDs should give a basic guide of the structure of the page
    // from the body, we can consider every instant child with an id as a directory, and from that child the same is applied
    // this way it can be made automatically
    // this requieres a tree structure

    const [path, setPath] = useState()
    const [directories, setDirectories] = useState()

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")

    const terminal = useRef()
    const lettersLimit = 68

    useEffect(() => {
        const d = DirectoryTree.directoriesBuilder()
        setDirectories(d)
        setPath(d)
        console.log(d.directoryName)
    }, [])

    const processMessage = (message) => {
        const list = [...messages]
        list.push({ prefix: `guest@cool-portfolio:${path.getAbsolutePath()}$`, message: message, type: "message" })

        setMessages(list)

        try {
            const parameters = parametersExtractor(message)
            console.log("parametros: ", parameters)
            Commands({ messagesSetter: setMessages, message: message, inputList: list, path: path, pathSetter: setPath, bufferOutputSetter:bufferOutputSetter })(parameters)
        } catch (e) {
            console.log(e)
            list.push({ prefix: "", message: `command not found: ` + message, type: "error" })
            setMessages(list)
        }


        console.log(messages)
    }


    return <div ref={terminal} className="terminalDisplay">


        {messages?.map((m, k) => {
            return <TerminalMessage key={k} prefix={m.prefix} content={m.message} type={m.type} lettersLimit={lettersLimit}></TerminalMessage>
        })}

        <form className='terminalInputContainer' onSubmit={(e) => {
            e.preventDefault()
            console.log(e.currentTarget[0].value)
            processMessage(e.currentTarget[0].value)
            e.currentTarget[0].value = ""
            setCurrentMessage("")
            // no lo pcurrentMessageense pero esto es bastante util cuando quiero que suceda una vez cambio todo el DOM, en el siguiente frame
            // bastante util tenerlo en cuenta
            //  <div className='terminalShell'>guest@cool-portfolio:{path.current}$</div>
            requestAnimationFrame(() => {
                terminal.current.scrollTop = terminal.current.scrollHeight
            })
        }}>
            <label className='terminalLine' htmlFor="terminalInput">
                <TerminalMessage prefix={`guest@cool-portfolio:${path?.getAbsolutePath()}$`} content={currentMessage} type={"input"} lettersLimit={lettersLimit}> </TerminalMessage>
            </label>
            <input autoComplete='off' onChange={(e) => {
                console.log("keydown", e.key)
                setCurrentMessage(e.currentTarget.value)

            }
            }
                id='terminalInput' className='terminalInput' type='text'>
            </input>
        </form>

    </div>
}

function TerminalMessage({ prefix, content, type, lettersLimit }) {
    const message = prefix + content

    const difference = lettersLimit - message.length

    // if the message is too long, it should truncate


    return (!(difference < 0) ?
        <div className='messageContainer'>
            <div style={type === "error" ? { color: "red" } : { color: "white" }} className='message'><span className='prefix'>{prefix}</span>
                {content}
                {(type === "input") ? <span className='cursor'>❚</span> : <></>}
            </div>
        </div>

        :
        <>
            <TerminalMessage prefix={prefix} content={content.slice(0, content.length + difference)} type={type === "input" ? "message" : type} lettersLimit={lettersLimit}></TerminalMessage>
            <TerminalMessage prefix={""} content={content.slice(content.length + difference)} type={type} lettersLimit={lettersLimit}></TerminalMessage>
        </>
    )


}

function Commands({ messagesSetter, message, inputList, path, pathSetter, bufferOutputSetter}) {
    const command = message.split(" ")[0]
    const execution = {
        help: () => {
            messagesSetter([...inputList,
            { message: "Commands: clear, echo, ls, cd, pwd, cat, help" }
            ])
        },

        sudo: () => {
            messagesSetter([...inputList,
            { message: "this incident will be reported." }
            ])
        },

        cat: (parameters) => {
            const parametersString = Object.values(parameters).join(" ")
            const content = path.files.find(e => e.name === parametersString).content
            bufferOutputSetter(inputList)
            messagesSetter([...inputList,
            { message: content }
            ])
        },

        pwd: () => {
            messagesSetter([...inputList,
            { message: path.getAbsolutePath() } // o lo que uses para representar el path
            ])
        },

        clear: () => {
            messagesSetter([])
        },

        echo: (parameters) => {
            // echo will simply read all parameters
            const parametersString = Object.values(parameters).join(" ")

            messagesSetter([...inputList,
            { message: parametersString }
            ])
        },
        ls: () => {

            const directories = path.children.map(d => { return "/" + d.directoryName })
            console.log(path.children)
            const files = path.files?.map(f => { return f.name })
            console.log(path.files)
            messagesSetter([...inputList,
            { message: directories.toString().replaceAll(",", " ") }
                , { message: files?.toString().replaceAll(",", " ") }
            ])
        },
        cd: (parameters) => {

            try {

                if (!(parameters.p1 === "..")) {

                    const match = path.children.find(tree => {
                        return tree.directoryName === parameters.p1
                    })
                    const section = match.directory
                    section.scrollIntoView({ behavior: "smooth" })
                    pathSetter(match)
                }

                else if (path.father) {
                    const section = path.father.directory
                    section.scrollIntoView({ behavior: "smooth" })
                    pathSetter(path.father)
                } else {
                    messagesSetter([...inputList,
                    { message: "forbidden directory: " + parameters.p1, type: "error" } // p1 should be the path
                    ])
                }

            } catch (e) {
                messagesSetter([...inputList,
                { message: "no such file or directory: " + parameters.p1, type: "error" } // p1 should be the path
                ])
            }
        }
    }


    return execution[command]
}


function parametersExtractor(message) {
    const inputs = message.split(" ")
    var parameters = {}
    inputs.forEach((element, index) => {
        if (!(index === 0)) {
            parameters["p" + index] = element
        }
    });

    return parameters
}


