import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  useEffect(() => {
    // Track page view
    if (window.Trakrly) {
      window.Trakrly.pv();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | Calgary Website Design Tips & Strategies | ClickAd Media</title>
        <meta
          name="description"
          content="Expert advice on web design, SEO, and digital marketing for Calgary service businesses. Actionable tips to grow your online presence."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-heading">
                Website Growth Strategies
              </h1>
              <p className="text-xl text-muted-foreground">
                Actionable advice on web design, SEO, and lead generation for Calgary service businesses
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-background"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  All Posts
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {!searchQuery && !selectedCategory && featuredPosts.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold font-heading mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="container mx-auto px-4 py-16">
          {!searchQuery && !selectedCategory && (
            <h2 className="text-3xl font-bold font-heading mb-8">Latest Articles</h2>
          )}
          
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .filter((post) => !searchQuery && !selectedCategory ? !post.featured : true)
                .map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No articles found</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="border-t bg-gradient-to-b from-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                Ready to Grow Your Business?
              </h2>
              <p className="text-xl text-muted-foreground">
                Get a free website audit and discover how to turn more visitors into customers.
              </p>
              <Button variant="glow" size="lg" asChild>
                <a href="/audit">Get Your Free Audit</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}