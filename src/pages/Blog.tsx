import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { generateCollectionPageSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { getAllBlogPosts, getAllCategories } from "@/data/blog/posts";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Blog = () => {
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  const collectionSchema = generateCollectionPageSchema(
    "Calgary Website Design Blog",
    "Expert insights on Calgary website design, local SEO, digital marketing, and growing your service business online."
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.clickadmedia.com" },
    { name: "Blog", url: "https://www.clickadmedia.com/blog" }
  ]);

  return (
    <>
      <SEOHead
        title="Calgary Website Design Blog | ClickAd Media"
        description="Expert insights on Calgary website design, local SEO, web development, and digital marketing strategies for service-based businesses."
        canonical="https://www.clickadmedia.com/blog"
        schemas={[collectionSchema, breadcrumbSchema]}
        keywords={[
          "Calgary website design blog",
          "Calgary SEO tips",
          "web design Calgary",
          "digital marketing Calgary",
          "Calgary business website"
        ]}
      />

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="mb-4">Blog</Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
                Calgary Website Design Insights
              </h1>
              <p className="text-xl text-muted-foreground">
                Expert advice on building, optimizing, and growing your Calgary business online.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-12 px-6">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                All Posts
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-20 px-6">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No posts found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Ready to Build Your Calgary Website?
              </h2>
              <p className="text-xl text-muted-foreground">
                Get a free audit and see how we can help grow your business online.
              </p>
              <Link to="/audit">
                <Button size="lg" className="shadow-lg shadow-primary/20">
                  Get Free Website Audit
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;