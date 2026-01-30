import './aboutme.css'
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { useEffect, useRef } from 'react';
export function AboutMe() {

    const socialTarget = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((e) => {
            console.log(e[0].intersectionRatio)
            if (socialTarget.current.classList.contains('scrolled')) {
                return
            }
            socialTarget.current.classList.toggle('scrolled', !e[0].isIntersecting)
        })
        observer.observe(socialTarget?.current)
    }, [])


    return <>
        <div className="displayAboutMe">
            <h2 className='subtitleAboutMe floor'>About me</h2>
            <p className='parrafoAboutMe floor'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <div ref={socialTarget} className='social'>
                <a className='media floor'>
                    <FaGithub></FaGithub>
                </a>
                <a className='media floor'>
                    <FaSquareInstagram></FaSquareInstagram>
                </a>
                <a className='media floor'>
                    <FaTelegram></FaTelegram>
                </a>
                <a className='media floor'>
                    <FaLinkedin></FaLinkedin>
                </a>
            </div>
        </div>


    </>
}