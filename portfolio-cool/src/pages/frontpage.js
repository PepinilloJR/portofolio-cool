import { useContext, useEffect, useRef, useState } from 'react'
import { AboutMe } from '../components/aboutme'
import { ProjectDisplay } from '../components/projects'
import { Rufus } from '../rufus/rufus'
import './frontpage.css'
import { frontPageContext } from '../context/context'
import { Picture } from '../components/picture'
import { SkillSet } from '../components/skillset'
import { Terminal } from '../components/terminal'

export function FrontPage() {
    //const frontContext = useContext(frontPageContext)
    //const [dragged, setDragged] = useState(false)
    const dragged = useRef(false);
    const rufusActive = useRef(false)
    const position = useRef({ x: 50, y: 50 })
    const velocity = useRef(0);
    const rufusRef = useRef()

    const mouseMovedHandler = (e) => {

        if (!dragged.current) {
            return
        }

        const x = e.clientX
        const y = e.clientY
         const { width } = rufusRef.current.getBoundingClientRect()
        //const offsetX = rufusRef.current.posFix.x - window.scrollX
        //const offsetY = rufusRef.current.posFix.y - window.scrollY
        const offsetY =  window.scrollY
        const offsetX = width / 2
        translateRufusFixed(x - offsetX, y + offsetY)

    }

    const collitionHandler = (x, y, collitions) => {

        const viewPortX = window.innerWidth + window.scrollX
        const viewPortY = window.innerHeight + window.scrollY

        const { width, height } = rufusRef.current.getBoundingClientRect()

        const totalX = x + width
        const totalY = y + height

        const pos = { x: x, y: y }

        if (totalX > viewPortX || pos.x < 0) {
            collitions?.push({ type: "wall", data: null })
        }

        if (totalY > viewPortY) {
            collitions?.push({ type: "floor", data: null })
        }

        if (totalY < window.scrollY) {
            collitions?.push({ type: "roof", data: null })
        }


        // get all elements that may collide 

        document.querySelectorAll(".floor").forEach(e => {
            const rect = e.getBoundingClientRect()

            const cPosX = rect.x + window.scrollX
            const cPosY = rect.y + window.scrollY
            const cHeight = rect.height - window.scrollY
            const cWidth = rect.width - window.scrollX

            if (
                pos.y + height > cPosY &&
                pos.y + height < cPosY + 10 &&
                pos.x + width > cPosX &&
                pos.x < cPosX + cWidth

            ) {
                collitions?.push({ type: "floorComponent", data: e })
            }

        })

    }

    const translationHandler = (x, y, tentativePositionY, collitions) => {


        const viewPortY = window.innerHeight + window.scrollY
        const viewPortX = window.innerWidth + window.scrollX

        const { width, height } = rufusRef.current.getBoundingClientRect()

        const pos = { x: x, y: y }

        let priority = 0;
        collitions?.forEach(c => {
            if (c.type === "floor") {
                tentativePositionY = 0;
                velocity.current = 0
                pos.y = viewPortY - height
                priority = 2
            } else if (c.type === "wall") {
                if (pos.x < 0) {
                    pos.x = 0
                } else if (pos.x > 0){
                    pos.x = viewPortX - width
                }

            } else if (c.type === "roof" && priority < 2) {
                tentativePositionY = 0
                console.log("toque el techo")
                pos.y = pos.y + height
                console.log(pos.y)
                priority = 1

            } else if (c.type === "floorComponent" && priority < 1) {
                const rect = c.data.getBoundingClientRect()
                const cPosY = rect.y + window.scrollY
                velocity.current = 0
                tentativePositionY = 0
                pos.y = cPosY - height
                priority = 0
            }
        })

        if (collitions?.length === 0) {
            pos.y = tentativePositionY
        }

        translateRufusFixed(pos.x, pos.y)
    }

    const translateRufusFixed = (x, y) => {
        const pos = { x: x, y: y }
        position.current = pos
        rufusRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`
    }

    useEffect(() => {
        var lastTime = performance.now()
        let tentativePosition = 0
        let collitions = []
        const fall = () => {
            const now = performance.now()

            const dt = (now - lastTime) / 1000
            lastTime = now

            if (!dragged.current && rufusActive.current) {
                velocity.current += 5 * dt
            } else {
                velocity.current = 0
            }

            tentativePosition = position.current.y + velocity.current

            if (rufusActive.current){
                collitionHandler(position.current.x, tentativePosition, collitions)
                translationHandler(position.current.x, position.current.y, tentativePosition, collitions)
            }

            collitions = []

            requestAnimationFrame(fall)

        }

        fall()

    }, [])

    return <>
        <frontPageContext.Provider value={{
            translationHandler,
            dragged,
            rufusActive,
            rufusRef,
            position,
            velocity
        }}>
            <div onMouseMove={mouseMovedHandler} onMouseUp={() => {
                dragged.current = false
            }} className='titleContainer floor'>
                <Rufus></Rufus>
                <h1 className="title floor">Welcome to my portfolio!</h1>

                <h2 className="subtitle floor">Here you will find some of my projects and other stuff...</h2>


                <div className='container'>
                    <SkillSet></SkillSet>
                    <AboutMe></AboutMe>
                    <ProjectDisplay></ProjectDisplay>
                </div>

                <div className='rufusDoor'>
                    rufus chamber
                </div>

                <Terminal></Terminal>
            </div>

        </frontPageContext.Provider>
    </>
}   

                    //<Picture></Picture>