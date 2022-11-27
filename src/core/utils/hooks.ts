import { useEffect, useState } from "react"

export function useInnerHeight(initialHeight = "100%") {
  const [height, setHeight] = useState(initialHeight)

  useEffect(() => {
    const documentHeight = () => {
      setHeight(window.innerHeight + "px")
    }
    documentHeight()
    window.addEventListener("resize", documentHeight)
    return () => window.removeEventListener("resize", documentHeight)
  }, [])

  return height
}
