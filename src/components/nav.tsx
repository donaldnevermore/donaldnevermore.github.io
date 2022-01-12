import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

const Nav = () => {
    const data = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          social {
            twitter
            email
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
            <Link to={"/blogs"}>
                Blogs
            </Link>
            <Link to={"/misc"}>
                Miscellaneous
            </Link>
            <Link to={"/about"}>
                About
            </Link>
            <a href={`mailto:${social.email}`} target="_blank" rel="noreferrer">
                Email
            </a>
            <a href={`https://twitter.com/${social?.twitter || ``}`} target="_blank" rel="noreferrer">
                Twitter
            </a>
        </nav>
    )
}

export default Nav
