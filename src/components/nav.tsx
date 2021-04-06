import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

const Nav = () => {
    const data = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `)

    const social = data.site.siteMetadata?.social

    return (
        <nav id="nav" className="nav-bar">
            <Link className="nav-item" to={"/"}>
                Home
            </Link>
            <Link to={"/thoughts"}>
                Thoughts
            </Link>
            <Link to={"/poems"}>
                Poems
            </Link>
            <Link to={"/about"}>
                About
            </Link>
            <Link to={`https://github.com/${social?.github || ``}`} target="_blank">
                GitHub
            </Link>
            <Link to={`https://twitter.com/${social?.twitter || ``}`} target="_blank">
                Twitter
            </Link>
        </nav>
    )
}

export default Nav
