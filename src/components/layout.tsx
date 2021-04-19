import * as React from "react"
import Nav from "./nav"
import { graphql, useStaticQuery } from "gatsby"

declare const __PATH_PREFIX__

const Layout = ({location, title, children}: { location, title, children }) => {
    const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            email
          }
        }
      }
    }
  `)

    const author = data.site.siteMetadata?.author
    const social = data.site.siteMetadata?.social
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
                <section>
                    <a href={`/rss.xml`} target={`_blank`}>RSS Feed</a>
                </section>
                <section>
                    <section>
                        © {new Date().getFullYear()}, Built with
                        {` `}
                        <a href="https://www.gatsbyjs.com" target="_blank">Gatsby</a>
                    </section>
                    <section>
                        © {new Date().getFullYear()}, Written by
                        {` `}
                        <a href={`https://twitter.com/${social?.twitter || ``}`} target={`_blank`}>
                            {author.name}
                        </a>
                    </section>
                </section>
            </footer>
        </article>
    )
}

export default Layout
