import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ListItem from "../components/list-item"

const List = ({data, location, description}: { data, location, description }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const nodes = data.allMarkdownRemark.nodes

    const posts = nodes.filter(post => post.frontmatter.description.includes(description))

    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <SEO title={`${description}`}/>
                <p>
                    No blog posts found. Add markdown posts to "content/blog" (or the
                    directory you specified for the "gatsby-source-filesystem" plugin in
                    gatsby-config.js).
                </p>
                <hr/>
            </Layout>
        )
    }

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title={`${description}`}/>
            <ol style={{listStyle: `none`}}>
                {posts.map(
                    post => (<ListItem post={post} key={post.fields.slug}/>)
                )}
            </ol>
        </Layout>
    )
}

export default List
