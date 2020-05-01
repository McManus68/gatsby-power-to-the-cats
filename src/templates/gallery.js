import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import style from "./gallery.module.scss"

export default ({ data }) => {
  let images = data.images.nodes

  const getStyle = image => {
    if (image.fluid.aspectRatio > 1.45) {
      return style.horizontal
    } else if (image.fluid.aspectRatio < 0.7) {
      return style.vertical
    } else return ""
  }

  return (
    <Layout>
      <SEO title="Power To The Cats" />
      <div className={style.gallery}>
        {images.map((image, i) => (
          <Img
            key={i}
            fluid={image.childImageSharp.fluid}
            className={getStyle(image.childImageSharp)}
          />
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($gallery: String!) {
    images: allFile(filter: { relativeDirectory: { eq: $gallery } }) {
      nodes {
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
            aspectRatio
          }
        }
      }
    }
  }
`
