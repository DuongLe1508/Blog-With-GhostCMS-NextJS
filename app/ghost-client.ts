import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials

const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0",
});

// create function to fetch navigation and data basic website-relate from Ghost
// getting you settings metadata from Ghost CMS
export async function getNavigation() {
  return await api.settings.browse();
}

// fetch posts data from Ghost CMS

export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
    })
    .catch((err) => {
      throw new Error(err);
    });
}

// get a single article from Ghost CMS API

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ["tags", "authors"] }
    )
    .catch((err) => {
      throw new Error(err);
    });
}

// return all posts realted to tag slug
export async function getTagPosts(tagSlug: string) {
  return await api.posts
    .browse({ filter: `tag:${tagSlug}`, include: "count.posts" })
    .catch((err) => {
      throw new Error(err);
    });
}

// return all the slugs to build static with generateStaticParams
export async function getAllTags() {
  return await api.tags
    .browse({
      limit: "all",
    })
    .catch((err) => {
      console.log(err);
    });
}

// get author meta Data

export async function getSingleAuthor(authorSlug: string) {
  return await api.authors
    .read(
      {
        slug: authorSlug,
      },
      { include: ["count.posts"] }
    )
    .catch((err) => {
      console.log(err);
    });
}

// get author related posts

export async function getSingleAuthorPosts(authorSlug: string) {
  return await api.posts
    .browse({ filter: `authors:${authorSlug}` })
    .catch((err) => {
      console.log(err);
    });
}

// get All author from Ghost CMS for generateStaticParams

export async function getAllAuthors() {
  return await api.authors
    .browse({
      limit: "all",
    })
    .catch((err) => {
      throw new Error(err);
    });
}

// Pages (Page)
export async function getAllPages() {
  return await api.pages
    .browse({
      limit: "all",
    })
    .catch((error: Error) => {
      console.log(error);
    });
}

// single page data

export async function getSinglePage(pageSlug: string) {
  return await api.pages
    .read(
      {
        slug: pageSlug,
      },
      { include: ["tags"] }
    )
    .catch((err) => {
      console.error(err);
    });
}

// Pagination
export async function getPaginationPosts(page: number) {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      page: page,
    })
    .catch((error: Error) => {
      console.log(error);
    });
}

// Search
export async function getSearchPosts() {
  return await api.posts
    .browse({ include: ["tags", "authors"], limit: "all" })
    .catch((error: Error) => {
      console.log(error);
    });
}
