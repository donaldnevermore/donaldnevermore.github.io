import * as React from "react"
import Nav from "./nav";
import { graphql, useStaticQuery } from "gatsby";

declare const __PATH_PREFIX__

const Layout = ({location, title, children}) => {
    const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

    const author = data.site.siteMetadata?.author
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath

    return (
        <article className="global-wrapper" data-is-root-path={isRootPath}>
            <header className="global-header">
                <Nav/>
                <hr/>
            </header>
            <main className="main-content">{children}</main>
            <hr/>
            <footer className={`foot`}>
                <p>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.com" target="_blank">Gatsby</a>
                    <br/>
                    © {new Date().getFullYear()}, Written by <strong>{author.name}</strong>
                </p>
            </footer>
        </article>
    )
}

export default Layout
