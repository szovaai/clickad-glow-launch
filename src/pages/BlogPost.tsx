import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { getBlogPostBySlug, getAllBlogPosts } from "@/data/blog/posts";
import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

// Import blog featured images
import websiteCostImage from "@/assets/blog/website-cost-calgary.jpg";
import smallBusinessImage from "@/assets/blog/small-business-website.jpg";
import localSeoImage from "@/assets/blog/local-seo-guide.jpg";
import chooseDesignerImage from "@/assets/blog/choose-web-designer.jpg";
import contractorMistakesImage from "@/assets/blog/contractor-mistakes.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/blog/website-cost-calgary.jpg": websiteCostImage,
  "/src/assets/blog/small-business-website.jpg": smallBusinessImage,
  "/src/assets/blog/local-seo-guide.jpg": localSeoImage,
  "/src/assets/blog/choose-web-designer.jpg": chooseDesignerImage,
  "/src/assets/blog/contractor-mistakes.jpg": contractorMistakesImage,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const blogPostSchema = generateBlogPostSchema(
    post.title,
    post.excerpt,
    post.publishDate,
    post.author,
    `https://www.clickadmedia.com/blog/${post.slug}`
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.clickadmedia.com" },
    { name: "Blog", url: "https://www.clickadmedia.com/blog" },
    { name: post.title, url: `https://www.clickadmedia.com/blog/${post.slug}` }
  ]);

  return (
    <>
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`https://www.clickadmedia.com/blog/${post.slug}`}
        schemas={[blogPostSchema, breadcrumbSchema]}
        keywords={post.keywords.join(", ")}
        ogType="article"
      />

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Back to Blog */}
        <section className="pt-32 pb-8 px-6">
          <div className="container max-w-4xl">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Featured Image Hero */}
        {post.featuredImage && (
          <section className="pb-12 px-6">
            <div className="container max-w-5xl">
              <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-lg shadow-primary/5">
                <img 
                  src={imageMap[post.featuredImage] || post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Header */}
        <article className="pb-20 px-6">
          <div className="container max-w-4xl">
            <header className="mb-12 space-y-6">
              <Badge variant="secondary" className="mb-4">{post.category}</Badge>
              
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mt-12 mb-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-heading text-xl md:text-2xl font-semibold mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 mb-6 list-disc list-inside text-muted-foreground">
                      {children}
                    </ul>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-semibold mb-4">
                  Ready to Transform Your Website?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get a free website audit and discover exactly how we can help grow your Calgary business online.
                </p>
                <Link to="/audit">
                  <Button size="lg" className="shadow-lg shadow-primary/20">
                    Get Free Website Audit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 px-6 bg-secondary/30 border-t border-border">
            <div className="container max-w-6xl">
              <h2 className="font-heading text-3xl font-bold mb-12 text-center">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="p-6 space-y-4">
                      <Badge variant="secondary">{relatedPost.category}</Badge>
                      
                      <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                        <Clock className="h-4 w-4" />
                        {relatedPost.readTime}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;