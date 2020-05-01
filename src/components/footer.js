import React from "react"

import style from "./footer.module.scss"

const Footer = () => (
  <footer className={style.footer}>
    Created By Emmanuel Tarrou, © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
)

export default Footer
