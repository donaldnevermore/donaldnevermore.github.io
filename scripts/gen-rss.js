const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");
/**
 * Returns whether a given absolute filepath is a file that should be
 * added to the feed.  Currently, returns true if file is a markdown
 * or mdx file.
 * If a directory is passed, returns false.
 * If anything else is passed, throws an error.
 *
 * @param {string} filepath A path to a file (or directory).
 * @returns {boolean} true if the item is a readable feed file, false otherwise.
 */
let is_feed_file = async (filepath) => {
  if (typeof filepath !== "string") {
    throw `is_feed_file(): Invalid arg type.  Expected string, got ${typeof filepath}`;
  }
  if (!path.isAbsolute(filepath)) {
    throw `is_feed_file(): Was passed '${filepath}': only absolute paths allowed`;
  }
  let stats = await fsPromises.stat(filepath).catch((err) => {
    throw `is_feed_file(): Error with calling 'stat' on file or directory: ${err}`;
  });
  if (!stats.isFile()) {
    return false;
  }
  // Confirm file is a blog file.
  let ext = path.extname(filepath || "").split(".");
  if (!["md", "mdx"].includes(ext)) {
    return false;
  }
  // Confirm file is readable.
  return (
    true ===
    (await fsPromises.access(filepath, fs.constants.R_OK).catch((err) => {
      console.error(`is_feed_file(): ${filepath} is not accessible!`);
      return false;
    }))
  );
};
/**
 * Builds a collection of feed items.  See also process_feed_item()
 *
 * Performs recursive search of first passed argument (directory is
 * assumed initially, but not required).
 *
 * @param {array} accumulator An accumulator to collect feed entries.
 * @param {string} name The directory or file to process.
 *                      Should be just the name of the file or directory.
 * @param {string} dirpath The absolute path of the directory containing
 *                         the file or directory specified by "name"
 * @returns {array} The accumulator with any additional feed items.
 */
let find_feed_items = async (accumulator, name, dirpath) => {
  let file_or_dir_full = path.join(dirpath, name);
  // Easier to deal with if we require paths to be absolute.
  if (!path.isAbsolute(file_or_dir_full)) {
    throw `find_feed_items(): Was passed '${file_or_dir_full}': only absolute paths allowed`;
  }
  let stats = await fsPromises.stat(file_or_dir_full).catch((err) => {
    console.error(
      "find_feed_items(): Error with calling 'stat' on file or directory",
      err
    );
  });
  if (stats?.isDirectory()) {
    let directory_contents = await fsPromises
      .readdir(file_or_dir_full)
      .catch((err) => {
        throw `find_feed_items(): Error reading directory: ${err}`;
      });
    // Recurse into the directory, passing our accumulator.
    await Promise.all(
      directory_contents.map((subdir) =>
        find_feed_items(accumulator, subdir, file_or_dir_full)
      )
    );
    return accumulator;
  }
  // It's a file, process if it's a blog file.
  if (is_feed_file(file_or_dir_full)) {
    accumulator.push(await create_feed_item(file_or_dir_full));
  }
};
/**
 * Generates a compatible feed entry for a given .md or .mdx file to the feed.
 * Throws an exception if the file passed is not an absolute path,
 * is not readable, or is anything other than a markdown (or mdx)
 * file.
 *
 * @param {string} file_full An absolute filepath to a markdown file.
 * @returns
 */
let create_feed_item = async (file_full) => {
  if (!path.isAbsolute(file_full)) {
    throw `Got ${name}: only absolute paths allowed`;
  }
  if (!is_feed_file(file_full)) {
    throw `${file_full} was not a valid feed file.`;
  }
  const content = await fsPromises.readFile(file_full).catch((err) => {
    throw `process_feed_item(): Failure reading file ${file_full}: ${err}`;
  });
  const frontmatter = matter(content);
  const site = "https://donaldnevermore.github.io/";
  const posts = file_full.match(/posts.*/)[0];
  const url = site + posts.replaceAll(/\\/g, "/").replace(/\.mdx?/, "");
  return {
    title: frontmatter?.data?.title ?? "No title",
    description: frontmatter?.data?.description ?? "No description",
    url,
    date: frontmatter?.data?.date ?? false,
    categories: frontmatter?.data?.tag?.split(", ") ?? "",
    author: frontmatter?.data?.author ?? false,
  };
};
let generate = async () => {
  // See options at https://www.npmjs.com/package/rss
  const feed = new RSS({
    title: "donaldnevermore",
    pubDate: new Date(),
    site_url: "https://donaldnevermore.github.io/",
    feed_url: "https://donaldnevermore.github.io/feed.xml",
  });
  let feed_items = await find_feed_items(
    [],
    "posts",
    path.join(__dirname, "..", "pages")
  );
  feed_items.map((entry) => feed.item(entry));
  console.info("New feed xml will be:");
  console.info(feed.xml({ indent: true }));
  await fsPromises.writeFile("./public/feed.xml", feed.xml({ indent: true }));
};
(async () => {
  await generate();
})();
