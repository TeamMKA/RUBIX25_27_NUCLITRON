import React from 'react'
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from './ui/text-reveal-card'

const QuoteCard = () => {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
    <TextRevealCard
      text="Embark on your journey through history today! Discover, learn, and experience the past like never before."
      revealText="'Those who cannot remember the past are condemned to repeat it.' - George Santayana "
    >
      <TextRevealCardTitle>
      Ready to Travel Through Time?
      </TextRevealCardTitle>
      <TextRevealCardDescription>
      Join Our History Enthusiasts
      </TextRevealCardDescription>
    </TextRevealCard>
  </div>
  )
}

export default QuoteCard