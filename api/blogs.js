let blogPosts = [
  {
    id: 1,
    title: "How AI is Transforming IT Solutions",
    date: "2025-11-01",
    excerpt: "Discover how AI-powered tools are revolutionizing business IT infrastructure and operations.",
    image: "/public/images/blog1.jpg",
    content: `<p>Artificial Intelligence (AI) is reshaping the IT industry by automating processes...</p>`
  },
  {
    id: 2,
    title: "Boost Your Business with ZapCorp APIs",
    date: "2025-11-10",
    excerpt: "Learn how ZapCorp APIs can streamline communication and workflow for your business.",
    image: "/public/images/blog2.jpg",
    content: `<p>ZapCorp offers powerful APIs that integrate messaging, notifications, and CRM systems...</p>`
  },
  {
    id: 3,
    title: "Top 5 IT Trends in 2025",
    date: "2025-11-20",
    excerpt: "Stay ahead of the competition by understanding the latest IT trends and innovations.",
    image: "/public/images/blog3.jpg",
    content: `<p>The IT industry continues to evolve rapidly with trends like cloud computing, AI automation...</p>`
  }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return list of all blog posts
    res.status(200).json(blogPosts);
  } else if (req.method === "POST") {
    try {
      const { title, date, excerpt, image, content } = req.body;

      if (!title || !date || !excerpt || !content) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const newPost = {
        id: blogPosts.length ? blogPosts[blogPosts.length - 1].id + 1 : 1,
        title,
        date,
        excerpt,
        image: image || "/public/images/default.jpg",
        content
      };

      blogPosts.push(newPost);
      res.status(201).json({ success: true, post: newPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
