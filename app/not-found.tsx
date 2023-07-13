import Link from "next/link";

function NotFound() {
  return (
    <section className="my-16 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 tracking-tight text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            {" "}
            Something wrong
          </p>
          <p className="mb-4 text-lg text-black dark:text-white">
            Sorry, we cant find that article. You will find lots to explore on
            the home page.
          </p>
          <Link
            href="/"
            className="inline-flex p-3 my-4 text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
