import * as React from "react"
import Layout from "../components/layout"
import Bio from "../components/bio"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const About = ({data, location}: { data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="about"/>
            <Bio/>
        </Layout>
    )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD YYYY, hh:mm a")
          update(formatString: "MMMM DD YYYY, hh:mm a")
          title
          description
        }
      }
    }
  }
`
