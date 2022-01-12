import * as React from "react"

import List from "../components/list"
import { graphql } from "gatsby"

const BlogIndex = ({data, location}: { data, location }) => {
    return <List data={data} location={location} description={`blogs`}/>
}

export default BlogIndex

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
          date(formatString: "YYYY-MM-DD, hh:mm a")
          update(formatString: "YYYY-MM-DD, hh:mm a")
          title
          description
        }
      }
    }
  }
`
