'use client'

import Image from "next/image";
import { TopbarLanding } from "@/components/navigation/TopbarLanding";
import GIF from '../../public/toastGIF.gif'
import '@/styles/landing.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./firebase-config";
import { ROUTE_DASHBOARD, ROUTE_REGISTER } from "./consts";

export default function Home() {
    const router = useRouter();
    const [lineOneFinish, setLineOneFinish] = useState(false)
    const [lineTwoFinish, setLineTwoFinish] = useState(false)
    const [lineThreeFinish, setLineThreeFinish] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLineOneFinish(true)
        }, 1750)
    }, [])

    useEffect(() => {
        if (lineOneFinish) {
            setTimeout(() => {
                setLineTwoFinish(true)
            }, 2000)
        }
    }, [lineOneFinish])

    useEffect(() => {
        if (lineTwoFinish) {
            setTimeout(() => {
                setLineThreeFinish(true)
            }, 2500)
        }
    }, [lineTwoFinish])

    const onTryIt = () => {
        if (auth.currentUser === null) {
            router.push(ROUTE_REGISTER)
        } else {
            router.push(ROUTE_DASHBOARD)
        }
    }

    return (
        <>
            <header>
                <TopbarLanding />
            </header>
            <main className="landing-main-container">
                <div className="landing-info-container">
                    <div className="landing-slogan-container">
                        <p className="landing-slogan-animation-one">
                            The best way to
                        </p>

                        {lineOneFinish &&
                            <p className="landing-slogan-animation-two">
                                complement
                            </p>
                        }
                        {lineTwoFinish &&
                            <p className="landing-slogan-animation-three">
                                your nutrition
                            </p>
                        }
                        {lineThreeFinish &&
                            <p className="landing-slogan-animation-four">
                                decisions
                            </p>
                        }
                    </div>
                    <button className="landing-try-button" onClick={onTryIt}>
                        Try it
                    </button>
                </div>
                <div className="landing-image-container">
                    <Image className="landing-gif" src={GIF} alt="GIF" />
                </div>
            </main>
        </>
    );
} ``
