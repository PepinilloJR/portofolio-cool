import { useEffect, useRef, useState } from 'react'
import './terminal.css'

export function Terminal() {


    const path = useRef("~")

    const [messages, setMessages] = useState([])

    const terminal = useRef()

    const processMessage = (message) => {
        const list = [...messages]
        list.push({ prefix: `guest@cool-portfolio:${path.current}$`, message: message })

        setMessages(list)
        console.log(messages)
    }


    return <div ref={terminal} className="terminalDisplay">

        {messages?.map((m, k) => {

            return <TerminalMessage key={k} prefix={m.prefix} content={m.message}></TerminalMessage>
        })}

        <form className='terminalInputContainer' onSubmit={(e) => {
            e.preventDefault()
            console.log(e.currentTarget[0].value)
            processMessage(e.currentTarget[0].value)
            e.currentTarget[0].value = ""
            // no lo pense pero esto es bastante util cuando quiero que suceda una vez cambio todo el DOM, en el siguiente frame
            // bastante util tenerlo en cuenta
            requestAnimationFrame(() => {
                terminal.current.scrollTop = terminal.current.scrollHeight
            })
        }}>
            <div className='terminalShell'>guest@cool-portfolio:{path.current}$</div>
            <input className='terminalInput' type='text'>


            </input>
        </form>

    </div>
}

function TerminalMessage({ prefix, content }) {

    return <div className='messageContainer'>

        <div className='message'><span className='prefix'>{prefix}</span>{content}</div>

    </div>

}
        //<div ref={prefixRef} className='prefix'>{prefix}</div>