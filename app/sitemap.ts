// import { allBlogs } from 'contentlayer/generated';
import client from "../utils/contentful";

async function getProjects() {
  try {
    const entries = await client.getEntries({
      content_type: "project",
      order: ["-sys.createdAt"], // Sort by createdAt in descending order

    });
    return entries.items.map((item) => item.fields);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getBlogPosts() {
  try {
    const entries = await client.getEntries({
      content_type: "blogPost",
      order: ["-sys.createdAt"], // Sort by createdAt in descending order

    });
    return entries.items.map((item) => item.fields);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}


export default async function sitemap() {
  const projects = await getProjects();
  const blogPosts = await getBlogPosts();

  const blogUrls = blogPosts.map((post) => ({
    url: `https://lucmarrie.com/blog/${post.slug}`
  }));

  const projectUrls = projects.map((project) => ({
    url: `https://lucmarrie.com/projects/${project.slug}`
  }));

  const routes = ['', '/projects', '/blog'].map(
    (route) => ({
      url: `https://lucmarrie.com/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogUrls, ...projectUrls];
}
