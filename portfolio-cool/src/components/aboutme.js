import './aboutme.css'
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export function AboutMe() {
    return <>
        <div className="displayAboutMe">
            <h2 className='subtitleAboutMe'>About me</h2>
            <p className='parrafo'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <div className='social'>
                <a className='media'>
                    <FaGithub></FaGithub>Github
                </a>
                <a className='media'>
                    <FaSquareInstagram></FaSquareInstagram>Instagram
                </a>
                <a className='media'>
                    <FaTelegram></FaTelegram>Telegram
                </a>
                <a className='media'>
                   <FaLinkedin></FaLinkedin>LinkedIn
                </a>
            </div>
        </div>


    </>
}