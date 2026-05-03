import { useContext, useEffect, useRef, useState } from 'react'
import { AboutMe } from '../components/aboutme'
import { ProjectDisplay } from '../components/projects'
import { Rufus } from '../rufus/rufus'
import './frontpage.css'
import { frontPageContext } from '../context/context'
import { Picture } from '../components/picture'
import { SkillSet } from '../components/skillset'
import { Terminal } from '../components/terminal'
import { IoTerminal } from "react-icons/io5";
import { RufusController } from '../rufus/rufusController'
export function FrontPage() {
    //const frontContext = useContext(frontPageContext)
    //const [dragged, setDragged] = useState(false)
    const [terminalOpen, setTerminalOpen] = useState(false)
    const [terminalBuffer, setTerminalBuffer] = useState([])
    
    //onMouseMove={mouseMovedHandler} onMouseUp={() => {
             //   dragged.current = false
            //}}

    return <>
        <frontPageContext.Provider value={{
            terminalBuffer
        }}>
            <div className='titleContainer floor'>
                <RufusController></RufusController>
                <h1 className="title floor">Welcome to my portfolio!</h1>

                <h2 className="subtitle floor">Here you will find some of my projects and other stuff...</h2>


                <div className='container'>
                    <SkillSet></SkillSet>
                    <AboutMe></AboutMe>
                    <ProjectDisplay></ProjectDisplay>

                </div>

                <div onClick={() => {
                    setTerminalOpen(!terminalOpen)}
                } className={terminalOpen ? 'terminalButtonOn' : 'terminalButtonOff'}>
                    <IoTerminal className='terminalIcon'></IoTerminal>
                </div>

                {terminalOpen ? <Terminal bufferOutputSetter={setTerminalBuffer}></Terminal> : <></> }
               
            </div>

        </frontPageContext.Provider>
    </>
}   

                    //<Picture></Picture>