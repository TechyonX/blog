require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `TechyonBlog by TechyonX`,
    description: `Шинжлэх ухаан, технологийн блог`,
    author: `TechyonX`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.API_URL || "http://localhost:1337",
        queryLimit: 1000, // Default to 100
        contentTypes: [`post`, `tag`],
      },
    },
  ],
};
