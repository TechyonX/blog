import { FluidObject } from "gatsby-image";

export type Post = {
  strapiId: number;
  slug: string;
  title: string;
  excerpt: string;
  publish_at: Date;
  childMdx: {
    body: string;
    tableOfContents: {
      items: [{ url: string; title: string }];
    };
    timeToRead: number;
  };
  author: {
    id: number;
    username: string;
    email: string;
    full_name: string;
  };
  tags: [{ id: number; name: string; slug: string }];
  image: {
    childImageSharp: {
      fluid: FluidObject;
      fixed: {
        src: string;
        height: number;
        width: number;
      };
    };
  };
};

export type Tag = {
  strapiId: number;
  slug: string;
  name: string;
  description: string;
};

export type Author = {
  strapiId: number;
  username: string;
  email: string;
  full_name: string;
};
