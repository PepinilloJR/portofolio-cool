import { useEffect, useRef, useState } from 'react'
import './terminal.css'
import { AiOutlineException } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { type } from '@testing-library/user-event/dist/type'

export function Terminal() {

    // how should paths work?
    // well, for instance, scanning the document for IDs should give a basic guide of the structure of the page
    // from the body, we can consider every instant child with an id as a directory, and from that child the same is applied
    // this way it can be made automatically
    // this requieres remaking some stuff

    const [path, setPath] = useState("~")

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")

    const terminal = useRef()

    const processMessage = (message) => {
        const list = [...messages]
        list.push({ prefix: `guest@cool-portfolio:${path}$`, message: message, type: "message" })

        setMessages(list)

        try {
            const parameters = parametersExtractor(message)
                console.log("parametros: ", parameters)
            Commands({ messagesSetter: setMessages, message: message, inputList: list, pathSetter: setPath })(parameters)
        } catch (e) {
            console.log(e)
            list.push({ prefix: "", message: `command not found: ` + message, type: "error" })
            setMessages(list)
        }


        console.log(messages)
    }


    return <div ref={terminal} className="terminalDisplay">


        {messages?.map((m, k) => {
            return <TerminalMessage key={k} prefix={m.prefix} content={m.message} type={m.type}></TerminalMessage>
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
                <TerminalMessage prefix={`guest@cool-portfolio:${path}$`} content={currentMessage} type={"input"}> </TerminalMessage>
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

function TerminalMessage({ prefix, content, type }) {

    const lettersLimit = 68
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
            <TerminalMessage prefix={prefix} content={content.slice(0, content.length + difference)} type={type === "input" ? "message" : type}></TerminalMessage>
            <TerminalMessage prefix={""} content={content.slice(content.length + difference)} type={type}></TerminalMessage>
        </>
    )


}

function Commands({ messagesSetter, message, inputList, pathSetter}) {
    const command = message.split(" ")[0]
    const execution = {
        clear: () => {
            messagesSetter([])
        },
        ls: () => {
            messagesSetter([...inputList,
            { message: "/Projects /AboutMe" }
            ])
        },
        cd: (parameters) => {
            
            try {

           
                const section = document.getElementById(parameters.p1)
                section.scrollIntoView({behavior: "smooth"})
                pathSetter(parameters.p1)
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
            parameters["p"+index] = element
        } 
    });

    return parameters
}