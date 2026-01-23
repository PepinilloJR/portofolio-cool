import './projects.css'

export function ProjectDisplay () {

    return <>
        <div className="display">
            
        </div>
    </>
}

function Project({type, content, title, subtitle, image}) { 

    return <div className='proyect'>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>

        <p>{content}</p>

        <img src={image}></img>
    </div>

}