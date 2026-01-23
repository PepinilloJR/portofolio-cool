import { useContext, useRef, useState } from "react"
import "./rufus.css"
import { frontPageContext } from "../context/context"

export function Rufus() {

    //const [dragged, setDragged] = useState(false)
    const { rufusRef, dragged, position, rufusActive } = useContext(frontPageContext)

    //const rufusRef = useRef()





    return <>
        <div

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
            ref={rufusRef} className="rufus"> Objeto agarrable </div>
    </>
}