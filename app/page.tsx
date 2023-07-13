import { Metadata } from "next";
import Card from "./Card";
import { getNavigation, getPosts, getSearchPosts } from "./ghost-client";
import Pagination from "./Pagination";
import * as fs from "node:fs";

export async function generateMetadata(): Promise<Metadata> {
  const Metadata = await getNavigation();
  return {
    title: Metadata.title,
    description: Metadata.description,
    keywords: ["Next.js", "React", "Javascript"],
  };
}

export default async function Home() {
  const getPost = await getPosts();

  // get All posts for search
  const AllPostForSerach = await getSearchPosts();

  // Enable getSearch

  try {
    const jsonString = JSON.stringify(AllPostForSerach);

    fs.writeFile("search.json", jsonString, "utf-8", (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  } catch (error) {
    console.log("error:", error);
  }

  return (
    <>
      <main className="container grid grid-cols-1 gap-2 mx-auto my-12 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {getPost?.map((item) => {
          return <Card key={item.uuid} item={item}></Card>;
        })}
      </main>
      <Pagination item={getPost.meta.pagination} />
    </>
  );
}
