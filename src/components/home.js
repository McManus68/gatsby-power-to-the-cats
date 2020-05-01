import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import style from "./home.module.scss"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      images: allImageSharp {
        nodes {
          original {
            width
            height
          }
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  let images = data.images.nodes

  const getStyle = image => {
    if (image.fluid.aspectRatio > 1.3) {
      return style.horizontal
    } else if (image.fluid.aspectRatio < 0.8) {
      return style.vertical
    } else return ""
  }

  return (
    <div className={style.home}>
      {images.map((image, i) => (
        <Img key={i} fluid={image.fluid} className={getStyle(image)} />
      ))}
    </div>
  )
}

export default Home
