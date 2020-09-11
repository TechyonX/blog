import { graphql } from "gatsby";

export const postFields = graphql`
  fragment postFields on Post {
    slug
    strapiId
    title
    excerpt
    status
    publish_at(formatString: "YYYY/MM/DD")
    childMdx {
      body
      tableOfContents
      timeToRead
    }
    image {
      childImageSharp {
        fluid(maxWidth: 960) {
          ...GatsbyImageSharpFluid
        }
        fixed {
          src
          height
          width
        }
      }
    }
    author {
      id
      username
      email
      full_name
    }
    tags {
      id
      name
      slug
    }
  }
`;

export const userFields = graphql`
  fragment userFields on StrapiUser {
    strapiId
    email
    username
    full_name
  }
`;

export const tagFields = graphql`
  fragment tagFields on StrapiTag {
    strapiId
    name
    slug
  }
`;
