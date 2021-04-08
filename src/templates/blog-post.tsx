import * as React from "react"
import { Link, graphql } from "gatsby"

import Reply from "../components/reply"
import Layout from "../components/layout"
import SEO from "../components/seo"
import License from "../components/license"

const BlogPostTemplate = ({data, location}: { data, location }) => {
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const {previous, next} = data

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.excerpt}
            />
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article">
                <header>
                    <h1 itemProp="headline">{post.frontmatter.title}</h1>
                    <p className={`post-date`}>{post.frontmatter.date}, modified: {post.frontmatter.update}</p>
                </header>
                <section
                    dangerouslySetInnerHTML={{__html: post.html}}
                    itemProp="articleBody"
                />
                <Reply/>
                <footer>
                    <License/>
                    <nav className="blog-post-nav">
                        <ul
                            style={{
                                display: `flex`,
                                flexWrap: `wrap`,
                                justifyContent: `space-between`,
                                listStyle: `none`,
                                padding: 0,
                            }}>
                            <li>
                                {previous && (
                                    <Link to={previous.fields.slug} rel="prev">
                                        ← {previous.frontmatter.title}
                                    </Link>
                                )}
                            </li>
                            <li>
                                {next && (
                                    <Link to={next.fields.slug} rel="next">
                                        {next.frontmatter.title} →
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </footer>
            </article>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        update(formatString: "MMMM DD, YYYY")
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
