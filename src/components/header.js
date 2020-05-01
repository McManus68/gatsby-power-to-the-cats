import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import style from "./header.module.scss"

import logo from "../assets/cat-icon.jpg"

const Header = ({ title }) => {
  // State usage with the local storage
  const useStateWithLocalStorage = key => {
    const [gallery, setGallery] = useState(
      typeof window !== "undefined"
        ? localStorage.getItem(key) || "cats"
        : "cats"
    )

    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, gallery)
      }
    }, [gallery])

    return [gallery, setGallery]
  }

  const [gallery, setGallery] = useStateWithLocalStorage("gallery")

  const data = useStaticQuery(graphql`
    query {
      gallery {
        names
      }
    }
  `)

  return (
    <header className={style.header}>
      <div className="wrapper">
        <div className={style.headerContainer}>
          <div className={style.titleContainer}>
            <img src={logo} alt={title} />
            <h1>{title}</h1>
          </div>
          <div className={style.galeryContainer}>
            {data.gallery.names.map((name, i) => {
              return (
                <Link
                  className={`${style.galeryLink} ${
                    gallery === name ? style.selected : ""
                  }`}
                  onClick={() => setGallery(name)}
                  key={i}
                  to={`/gallery/${name}`}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
