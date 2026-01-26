import { useContext, useEffect, useRef, useState } from "react"
import "./rufus.css"
import { frontPageContext } from "../context/context"

export function Rufus() {

    //const [dragged, setDragged] = useState(false)
    const { rufusRef, dragged, position, velocity, rufusActive } = useContext(frontPageContext)
    const [spritesLoaded, setSpritesLoaded] = useState(false)
    //const rufusRef = useRef()

    const spritesURL = ['image.png', 'image copy.png','image copy 2.png']
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
    }, [spritesLoaded])


    const animationHandler = () => {
        //console.log(rufusRef.current.yV)
        const context = rufusRef.current.getContext("2d")
        if (dragged.current) {

            context.clearRect(0, 0, 750, 400)
            context.drawImage(sprites.current[1], 0, 0)
        } else if (velocity.current === 0) {
            context.clearRect(0, 0, 750, 400)
            context.drawImage(sprites.current[0], 0, 0)
        } else if (velocity.current > 0) {
            context.clearRect(0, 0, 750, 400)
            context.drawImage(sprites.current[2], 0, 0)
        }

        requestAnimationFrame(animationHandler)
    }

    return <>
        <canvas

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
            ref={rufusRef} width="750" height="400" className="rufus"></canvas>
    </>
}