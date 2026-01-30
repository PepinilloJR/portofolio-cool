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
            <p className='parrafoAboutMe floor'>I am a software developer and software engineering student from Argentina, always up for learning and trying new things. I love to start new projects in my free time, although I am more invested in backend, networking, or game development.
            </p>

            <div ref={socialTarget} className='social'>
                <a href='https://github.com/PepinilloJR' target='_blank' className='media floor'>
                    <FaGithub></FaGithub>
                </a>
                <a href='https://www.instagram.com/fran_gonzo2/' target='_blank' className='media floor'>
                    <FaSquareInstagram></FaSquareInstagram>
                </a>
                <a href='http://t.me/PepinilloJR' target='_blank' className='media floor'>
                    <FaTelegram></FaTelegram>
                </a>
                <a href='https://www.linkedin.com/in/francisco-monasterolo-16926822a/' target='_blank' className='media floor'>
                    <FaLinkedin></FaLinkedin>
                </a>
            </div>
        </div>


    </>
}