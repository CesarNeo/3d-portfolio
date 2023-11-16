import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface HomeInfoProps {
  currentStage: number
}

interface InfoBoxProps {
  text: string
  link: string
  linkText: string
}

function InfoBox({ text, link, linkText }: InfoBoxProps) {
  return (
    <div className="info-box">
      <p className="text-center font-medium sm:text-xl">{text}</p>
      <Link href={link} className="neo-brutalism-white neo-btn">
        {linkText}

        <Image
          src="/assets/icons/arrow.svg"
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      </Link>
    </div>
  )
}

const RENDER_CONTENT = {
  1: (
    <h1 className="neo-brutalism-blue mx-5 px-8 py-4 text-center text-white sm:text-xl sm:leading-snug">
      Hi, I am <span className="font-semibold">Cesar</span> 👋🏼
      <br />A Software Engineer from Brazil
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with many companies and picked up many skills along the way"
      link="/about"
      linkText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple projects to success over the years. Curious about the impact?"
      link="/projects"
      linkText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? i'm just a few keystrokes away"
      link="/contact"
      linkText="Let's talk"
    />
  ),
} as Record<number, ReactNode>

function HomeInfo({ currentStage }: HomeInfoProps) {
  return RENDER_CONTENT[currentStage] || null
}

export default HomeInfo
