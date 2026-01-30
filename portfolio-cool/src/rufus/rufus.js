import { useContext, useEffect, useRef, useState } from "react"
import "./rufus.css"
import { frontPageContext } from "../context/context"

export function Rufus() {

    //const [dragged, setDragged] = useState(false)
    const { rufusRef, dragged, position, velocity, rufusActive } = useContext(frontPageContext)
    const [spritesLoaded, setSpritesLoaded] = useState(false)
    //const rufusRef = useRef()

    const bgCanvas = useRef()
    const time = useRef(0)

    const spritesURL = ['rufusDrag.png', 'rufusFall.png', 'rufusStill1.png', 'back1.png', 'back2.png', 'back3.png', 'back4.png']
    const sprites = useRef([])

    useEffect(() => {

        let i = 0;
        spritesURL.forEach((u) => {
            const img = new Image(30, 30)
            sprites.current.push(img)
            img.onload = () => {
                i++;

                if (i === spritesURL.length) {
                    setSpritesLoaded(true)
                }
            }
            img.src = u

        })
    }, [])

    useEffect(() => {
        if (spritesLoaded) {
            const context = rufusRef.current.getContext("2d")
            console.log(sprites.current[0])
            context.clearRect(0, 0, 750, 400)
            context.drawImage(sprites.current[0], 0, 0)


        }
        animationHandler()
        bgAnimationHandler()
    }, [spritesLoaded])


    const animationHandler = () => {
        //console.log(rufusRef.current.yV)
        const context = rufusRef.current.getContext("2d")
        if (dragged.current) {

            context.clearRect(0, 0, 300, 300)
            context.drawImage(sprites.current[0], 0, 0)
        } else if (velocity.current === 0) {
            context.clearRect(0, 0, 300, 300)
            context.drawImage(sprites.current[2], 0, 0)
        } else if (velocity.current > 0) {
            context.clearRect(0, 0, 300, 300)
            context.drawImage(sprites.current[1], 0, 0)
        }

        requestAnimationFrame(animationHandler)
    }

    const bgAnimationHandler = () => {
        var lastTime = performance.now()

        const context = bgCanvas.current.getContext("2d")

        const animateBg = () => {
            const now = performance.now()
            const dt = (now - lastTime) / 1000
            time.current += dt * 5
            lastTime = now
            context.clearRect(0, 0, 300, 300)

            if (Math.round(time.current) > 3) {
                time.current = 0
            }
            context.drawImage(sprites.current[Math.round(time.current) + 3], 0, 0)

            if (rufusActive.current) {
                bgCanvas.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`
            }
            requestAnimationFrame(animateBg)
        }
animateBg()
    }

    return <>
        <canvas className="rufus"

            onMouseDown={
                (e) => {
                    dragged.current = true
                    rufusActive.current = true
                    const rect = e.currentTarget.getBoundingClientRect()

                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    rufusRef.current.posFix = { x: x, y: y }
                }
            }
            ref={rufusRef} width="200" height="200"></canvas>
        <canvas className="backgroundCanvas" ref={bgCanvas} width="200" height="200"></canvas>
    </>
}