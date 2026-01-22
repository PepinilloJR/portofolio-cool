import { AboutMe } from '../components/aboutme'
import { ProjectDisplay } from '../components/projects'
import './frontpage.css'

export function FrontPage() {
    return <>
        <div className='titleContainer'>
            <h1 className="title">Welcome to my portfolio!</h1>

            <h2 className="subtitle">Here you will find some of my projects and other stuff...</h2>


            <div className='container'>
                <AboutMe></AboutMe>
                <ProjectDisplay></ProjectDisplay>
            </div>

        </div>
    </>
}   