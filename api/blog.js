// Sample serverless function for blog posts
// Save this as /api/blog.js for Vercel deployment

export default function handler(req, res) {
  // Optional: You can switch to a real DB later
  const blogPosts = [
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

  // Return all posts
  res.status(200).json(blogPosts);
}
