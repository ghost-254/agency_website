"use client"

import { useState, useEffect, type RefObject } from "react"

interface UseIntersectionObserverProps {
  elementRef: RefObject<Element>
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  elementRef,
  threshold = 0,
  rootMargin = "0px",
  freezeOnceVisible = false,
}: UseIntersectionObserverProps): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const element = elementRef?.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting
        setIsVisible(isElementVisible)

        if (isElementVisible && freezeOnceVisible) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [elementRef, threshold, rootMargin, freezeOnceVisible])

  return isVisible
}

