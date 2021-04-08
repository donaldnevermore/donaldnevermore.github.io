import * as React from "react"

import List from "../components/list"
import { graphql } from "gatsby"

const Thoughts = ({data, location}: { data, location }) => {
    return <List data={data} location={location} description={`thoughts`}/>
}

export default Thoughts

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
          description
        }
      }
    }
  }
`
