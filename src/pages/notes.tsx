import * as React from "react"

import List from "../components/list"
import { graphql } from "gatsby"

const Notes = ({data, location}: { data, location }) => {
    return <List data={data} location={location} description={`notes`}/>
}

export default Notes

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
