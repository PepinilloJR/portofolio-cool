import './projects.css'

export function ProjectDisplay() {

    return <>
        <div className="display">

            <h1 className='titleProjects'>Projects!</h1>
            
            <h1 className='subtitleProjects floor'>Some of my projects, many of them still under development...</h1>
            <Project type={1} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                title={"Calculator"} subtitle={"An application to calculate numbers"} image={"placeholder.png"}
            >

            </Project>
        </div>
    </>
}

function Project({ type, content, title, subtitle, image }) {

    return <div className='projectContainer'>
        <div className='project' style={{ gridColumn: type === 1 ? 2 : 1, gridRow: 1 }} >
            <h1 className='projectTitle floor' >{title}</h1>
            <h2 className='projectSubtitle floor'>{subtitle}</h2>

            <p className='parrafo floor'>{content}</p>
        </div>
        <img className='projectImg floor' style={{ gridColumn: type === 1 ? 1 : 2 }} src={image}></img>
    </div>

}