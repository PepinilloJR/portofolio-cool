import { useEffect, useRef, useState } from 'react'
import './projects.css'

export function ProjectDisplay() {

    const [projects, setProjects] = useState([])

    const loadProjects = async () => {
        const data = await fetch("./projects.json")
        const jsonProjects = await data.json()
        console.log(jsonProjects)

        const projects_ = []

        let i = 0;
        jsonProjects.forEach(p => {
            console.log(p)

            let project = { title: p.title, subtitle: p.subtitle, content: p.content, image: null, url: p.url }

            const img = new Image(500, 500)
            img.src = p.image
            project.image = img
            projects_.push(project)
            img.onload = () => {
                i++
                console.log("se cargaron las fotos")
                if (i === jsonProjects.length) {
                    console.log("se cargaron las fotos")
                    setProjects(projects_)
                }
            }
            img.onerror = () => {
                i++
                if (i === jsonProjects.length) {
                    console.log("se cargaron las fotos")
                    setProjects(projects_)
                }
            }

        });
        console.log(projects_)
    }

    useEffect(() => {
        loadProjects()

    }, [])


    return <>
        <div className="display">



            <h1 className='titleProjects'>Projects!</h1>

            <h1 className='subtitleProjects floor'>Some of my projects, many of them still under development...</h1>

            {
            projects?.map((p, key) => {
                let type
                if (key % 2 === 0) {
                    type = 2
                } else {
                    type = 1
                }
                return <Project key={key} type={type} content={p.content}
                    title={p.title} subtitle={p.subtitle} image={p.image} url={p.url}
                >

                </Project>


            })}

        </div>
    </>
}

function Project({ type, content, title, subtitle, image, url }) {

    const project = useRef()
    const observerTarget = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((e) => {
            console.log(e[0].intersectionRatio)
            if (project.current.classList.contains('projectAnimated')) {
                return
            }
            project.current.classList.toggle('projectAnimated', e[0].isIntersecting)
        },{scrollMargin: "10px"})
        observer.observe(observerTarget.current)
    }, []) 

    return <div ref={project} className='projectContainer'>
        <a target="_blank" href={url} className='project findout' style={{ gridColumn: type === 1 ? 2 : 1, gridRow: 1 }} >
            <h1 className='projectTitle floor' >{title}</h1>
            <h2 className='projectSubtitle floor'>{subtitle}</h2>

            <p ref={observerTarget} className='parrafo floor'>{content}</p>

        
        </a>
        <img className='projectImg floor' style={{ gridColumn: type === 1 ? 1 : 2, gridRow: 1, transform: type === 1 ? "rotate(-1deg)" : "rotate(1deg)"}} src={image.src}></img>
    </div>

}

//<img className='projectImg floor' style={{ gridColumn: type === 1 ? 1 : 2 }} src={image}></img>