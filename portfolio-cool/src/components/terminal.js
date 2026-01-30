import { useRef } from 'react'
import './terminal.css'

export function Terminal() {


    const path = useRef("~")

    const messages = useRef([])

    const processMessage = (message) => {

        messages.current.push(terminalMessage(`guest@cool-portfolio:${path.current}$`, message))
    }


    return <div className="terminalDisplay">

        <form className='terminalInputContainer' onSubmit={(e) => {
            e.preventDefault()
            console.log(e.currentTarget[0].value)
            processMessage(e.currentTarget[0].value)
            e.currentTarget[0].value = ""
        }}>
        <div className='terminalShell'>guest@cool-portfolio:{path.current}$</div>
        <input className='terminalInput' type='text'>
            
        
        </input>
        </form>

    </div>
}

function terminalMessage({prefix, content}) {

}