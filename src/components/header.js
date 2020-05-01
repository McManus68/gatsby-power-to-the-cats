import React from "react"
import PropTypes from "prop-types"

import style from "./header.module.scss"

import logo from "../assets/cat-icon.jpg"

const Header = ({ siteTitle }) => (
  <header className={style.header}>
    <img src={logo} alt="Power To The Cats" />
    <h1>{siteTitle}</h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
