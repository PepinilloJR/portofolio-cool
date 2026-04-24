import { useEffect, useRef, useState } from 'react'
import './terminal.css'
import { AiOutlineException } from 'react-icons/ai'

export function Terminal() {


    const path = useRef("~")

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")

    const terminal = useRef()

    const processMessage = (message) => {
        const list = [...messages]
        list.push({ prefix: `guest@cool-portfolio:${path.current}$`, message: message, type: "message" })

        setMessages(list)

        try {
            commands({ messagesSetter: setMessages, message: message, inputList: list, path: path })()
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
                <TerminalMessage prefix={`guest@cool-portfolio:${path.current}$`} content={currentMessage} type={"input"}> </TerminalMessage>
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

    const lettersLimit = 60
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

function commands({ messagesSetter, message, inputList, path }) {

    const execution = {
        clear: () => {
            messagesSetter([])
        },
        ls: () => {
            messagesSetter([...inputList,
            { message: "/Proyectos /SobreMi" }
            ])
        }
    }


    return execution[message]
}
