import React from "react"
import { Badge } from "@/components/ui/badge"

interface SectionHeadingProps {
  headingMini: string
  headingPrimary: string
  alignment?: "center" | "left" | "right"
  className?: string
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  headingMini,
  headingPrimary,
  alignment = "center",
  className = "",
}) => {
  const alignmentClasses = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto",
  }

  return (
    <div className={`space-y-4 max-w-2xl ${alignmentClasses[alignment]} ${className}`}>
      <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5" data-aos="fade-up">
        {headingMini}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight" data-aos="fade-up" data-aos-delay="100">
        {headingPrimary.split(" ").map((word, i) => (
          <React.Fragment key={i}>
            {i === 0 ? <span className="text-primary">{word}</span> : word}
            {i < headingPrimary.split(" ").length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </h2>
      <div
        className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mt-2"
        data-aos="fade-up"
        data-aos-delay="150"
        style={{
          marginLeft: alignment === "center" ? "auto" : alignment === "right" ? "auto" : "0",
          marginRight: alignment === "center" ? "auto" : alignment === "left" ? "auto" : "0",
        }}
      ></div>
    </div>
  )
}

export default SectionHeading

