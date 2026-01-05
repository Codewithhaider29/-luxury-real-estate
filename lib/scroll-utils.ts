export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80 // Height of the fixed header
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}
