import * as React from "react"
import Layout from "../components/layout";
import Bio from "../components/bio";
import { graphql } from "gatsby";

const About = ({data, location}) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>
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
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMMM DD, YYYY")
          title
          category
        }
      }
    }
  }
`

