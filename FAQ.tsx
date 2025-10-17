
import { useEffect, useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setFaqs(data))
  }, [])

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className="faq-container">
      <div className="faq-header">
        <img src="/src/assets/images/icon-star.svg" alt="star icon" className="star-icon" />
        <h1>FAQs</h1>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <img
                src={
                  activeIndex === index
                    ? '/src/assets/images/icon-minus.svg'
                    : '/src/assets/images/icon-plus.svg'
                }
                alt={activeIndex === index ? 'Collapse' : 'Expand'}
                className="icon-toggle"
              />
            </button>
            <div
              className="faq-answer"
              style={{
                maxHeight: activeIndex === index ? '200px' : '0',
                opacity: activeIndex === index ? 1 : 0,
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
