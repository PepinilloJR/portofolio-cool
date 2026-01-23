import { useContext, useEffect, useRef, useState } from 'react'
import { AboutMe } from '../components/aboutme'
import { ProjectDisplay } from '../components/projects'
import { Rufus } from '../rufus/rufus'
import './frontpage.css'
import { frontPageContext } from '../context/context'
import { Picture } from '../components/picture'

export function FrontPage() {
    //const frontContext = useContext(frontPageContext)
    //const [dragged, setDragged] = useState(false)
    const dragged = useRef(false);
    const rufusActive = useRef(false)
    const position = useRef({ x: 50, y: 50 })
    const rufusRef = useRef()

    const mouseMovedHandler = (e) => {

        if (!dragged.current) {
            return
        }

        const x = e.clientX
        const y = e.clientY

        const offsetX = rufusRef.current.posFix.x - window.scrollX
        const offsetY = rufusRef.current.posFix.y - window.scrollY

        translateRufus(x - offsetX, y - offsetY)

    }


    const translateRufus = (x, y, collitions) => {
        const viewPortX = window.innerWidth + window.scrollX
        const viewPortY = window.innerHeight + window.scrollY


        const { width, height } = rufusRef.current.getBoundingClientRect()

        const totalX = x + width
        const totalY = y + height


        const pos = { x: viewPortX - width, y: viewPortY - height }

        if (totalX < viewPortX) {
            pos.x = x
        } else {
            collitions?.push("wall")
        }

        if (totalY < viewPortY) {
            pos.y = y
        } else {
            collitions?.push("floor")
        }

        position.current = pos
        rufusRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`
    }

    useEffect(() => {
        var lastTime = performance.now()
        let yV = 1;
        //{itCollided: false, type: ""}
        let collitions = []
        

        const fall = () => {
            const now = performance.now()
            console.log(dragged.current)
            const dt = (now - lastTime) / 1000
            lastTime = now

            const y = yV * dt;
            yV += 5
            if (!dragged.current && rufusActive.current) {
                translateRufus(position.current.x, position.current.y + y, collitions)
            } else {
                yV = 1;
            }

            collitions.forEach(c => {
                if (c == "floor") {
                    yV = 0;
                }
            })

            collitions = []

            requestAnimationFrame(fall)
        }

        fall()

    }, [])

    return <>
        <frontPageContext.Provider value={{
            translateRufus,
            dragged,
            rufusActive,
            rufusRef,
            position
        }}>
            <div onMouseMove={mouseMovedHandler} onMouseUp={() => {
                dragged.current = false
            }} className='titleContainer'>
                <Rufus></Rufus>
                <h1 className="title">Welcome to my portfolio!</h1>

                <h2 className="subtitle">Here you will find some of my projects and other stuff...</h2>


                <div className='container'>
                    <Picture></Picture>
                    <AboutMe></AboutMe>
                    <ProjectDisplay></ProjectDisplay>
                </div>

            </div>
        </frontPageContext.Provider>
    </>
}   