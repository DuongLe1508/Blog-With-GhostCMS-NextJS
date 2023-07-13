// import Newsletter from "./Newsletter";
import Link from "next/link";
import { getSinglePost, getPosts } from "../../ghost-client";
import Image from "next/image";

// import icon
import { FaAngleLeft } from "react-icons/fa";

// format the date
import { format } from "date-fns";

// css for card
import "../../cards.min.css";

// types for typescript
import type { Metadata } from "next";
import type { PostOrPage } from "@tryghost/content-api";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metaData: PostOrPage = await getSinglePost(params.slug);
  let tags = metaData?.tags?.map((item) => item.name);
  return {
    title: metaData.title,
    description: metaData.og_description,
    keywords: tags as string | string[],
    openGraph: {
      title: metaData.title,
      description: metaData.excerpt,
      url: metaData.url,
      // keywords: tags,
      images: [
        {
          url: metaData.feature_image!,
        },
      ],
      // type: 'website',
    },
  };
}

export default async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);
  return (
    <>
      <>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
          <div className="flex justify-between max-w-screen-xl px-4 mx-auto ">
            <article className="w-full max-w-3xl mx-auto prose prose-xl prose-p:text-gray-800 dark:prose-p:text-gray-100 sm:prose-base prose-a:no-underline prose-blue dark:prose-invert">
              <div className="flex justify-between w-full mb-4">
                <Link className="inline-flex items-center" href={`/`}>
                  <FaAngleLeft /> Back
                </Link>

                {getPost.primary_tag ? (
                  <Link href={`/tags/${getPost?.primary_tag.slug}`}>
                    # {getPost?.primary_tag.name}
                  </Link>
                ) : (
                  ""
                )}
              </div>

              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {getPost.title}
              </h1>

              <p className="lead">{getPost.excerpt}</p>

              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <Image
                      width={32}
                      height={32}
                      className="w-10 h-10 mr-4 rounded-full"
                      src={getPost?.primary_author?.profile_image || ""}
                      alt={getPost?.primary_author?.name || ""}
                    />
                    {getPost.primary_author ? (
                      <Link
                        href={`/authors/${getPost?.primary_author.slug}`}
                        rel="author"
                        className="text-xl font-bold text-gray-800 dark:text-white"
                      >
                        {getPost?.primary_author.name}
                      </Link>
                    ) : (
                      " "
                    )}

                    {getPost.published_at ? (
                      <time
                        className="mx-1 text-base font-light text-gray-800 dark:text-white"
                        dateTime={getPost?.published_at}
                        title={format(
                          new Date(getPost?.published_at),
                          "yyyy-MM-dd"
                        )}
                      >
                        {format(
                          new Date(getPost?.published_at),
                          "dd MMMM, yyyy"
                        )}
                      </time>
                    ) : (
                      ""
                    )}

                    <div className="w-1 h-1 mx-1 text-base bg-black rounded-full dark:bg-white"></div>

                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      {" "}
                      {getPost.reading_time} Min Read
                    </p>
                  </div>
                </address>
              </header>

              <figure>
                <Image
                  className="mx-auto"
                  width={1000}
                  height={250}
                  src={getPost.feature_image || ""}
                  alt={getPost.feature_image_alt || ""}
                />
                <figcaption
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html: getPost?.feature_image_caption!,
                  }}
                ></figcaption>
              </figure>

              <div dangerouslySetInnerHTML={{ __html: getPost?.html! }}></div>
            </article>
          </div>
        </main>
        {/* <Newsletter /> */}
      </>
    </>
  );
}
