
import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  readTime: number;
  tags: string[];
}

// Mock data - replace with actual API calls
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
    excerpt: "World leaders unite in unprecedented commitment to reduce carbon emissions by 50% over the next decade, marking a turning point in climate action.",
    content: "Full article content here...",
    author: "Sarah Johnson",
    publishedAt: "2025-01-01T08:00:00Z",
    category: "World",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    readTime: 8,
    tags: ["Climate", "Politics", "Environment"]
  },
  {
    id: 2,
    title: "Tech Innovation Drives Economic Growth in Emerging Markets",
    excerpt: "Artificial intelligence and renewable energy sectors show remarkable expansion in developing economies worldwide.",
    content: "Full article content here...",
    author: "Michael Chen",
    publishedAt: "2025-01-01T06:30:00Z",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    readTime: 6,
    tags: ["Technology", "Economy", "Innovation"]
  },
  {
    id: 3,
    title: "Olympic Games Preparation Intensifies as Host City Unveils New Venues",
    excerpt: "State-of-the-art facilities showcase sustainable design principles while preparing to welcome athletes from around the globe.",
    content: "Full article content here...",
    author: "Emma Rodriguez",
    publishedAt: "2025-01-01T05:15:00Z",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    readTime: 5,
    tags: ["Olympics", "Sports", "Architecture"]
  },
  {
    id: 4,
    title: "Breakthrough in Medical Research Offers Hope for Rare Disease Patients",
    excerpt: "Scientists announce promising results from clinical trials of new gene therapy treatment.",
    content: "Full article content here...",
    author: "Dr. James Wilson",
    publishedAt: "2025-01-01T04:00:00Z",
    category: "World",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    readTime: 7,
    tags: ["Medicine", "Research", "Health"]
  },
  {
    id: 5,
    title: "Hollywood's Biggest Stars Gather for Charity Gala",
    excerpt: "Annual fundraising event raises millions for education initiatives in underserved communities.",
    content: "Full article content here...",
    author: "Lisa Thompson",
    publishedAt: "2024-12-31T22:00:00Z",
    category: "Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    readTime: 4,
    tags: ["Entertainment", "Charity", "Celebrities"]
  },
  {
    id: 6,
    title: "Financial Markets Show Strong Performance Despite Global Uncertainties",
    excerpt: "Investors remain optimistic as major indices reach new heights driven by technology and healthcare sectors.",
    content: "Full article content here...",
    author: "Robert Kim",
    publishedAt: "2024-12-31T20:30:00Z",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    readTime: 6,
    tags: ["Finance", "Markets", "Economy"]
  }
];

const Homepage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setArticles(mockArticles);
    setFeaturedArticle(mockArticles[0]);
    setTrendingTopics(["Climate Change", "AI Innovation", "Olympic Games", "Medical Breakthrough", "Global Economy"]);
  }, []);

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.id}`);
  };

  const topStories = articles.slice(1, 7);
  const categoryArticles = {
    World: articles.filter(a => a.category === 'World').slice(0, 3),
    Business: articles.filter(a => a.category === 'Business').slice(0, 3),
    Sports: articles.filter(a => a.category === 'Sports').slice(0, 3),
    Entertainment: articles.filter(a => a.category === 'Entertainment').slice(0, 3),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            {featuredArticle && (
              <section className="mb-12">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-96 md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      {featuredArticle.category}
                    </span>
                    <h1 className="text-hierarchy-1 mb-4 cursor-pointer hover:text-gray-200 transition-colors" onClick={() => handleArticleClick(featuredArticle)}>
                      {featuredArticle.title}
                    </h1>
                    <p className="text-lg text-gray-200 mb-4 max-w-3xl">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>By {featuredArticle.author}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Top Stories */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-hierarchy-2">Top Stories</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {topStories.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    size="medium"
                    onClick={handleArticleClick}
                  />
                ))}
              </div>
            </section>

            {/* Category Sections */}
            {Object.entries(categoryArticles).map(([category, articles]) => (
              articles.length > 0 && (
                <section key={category} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-hierarchy-2">{category}</h2>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80"
                      onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                    >
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        size="small"
                        onClick={handleArticleClick}
                      />
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingTopics.map((topic, index) => (
                      <div key={index}>
                        <button className="text-sm hover:text-primary transition-colors text-left">
                          {topic}
                        </button>
                        {index < trendingTopics.length - 1 && <Separator className="mt-2" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest news delivered to your inbox every morning.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    />
                    <Button className="w-full" size="sm">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Most Read */}
              <Card>
                <CardHeader>
                  <CardTitle>Most Read</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.slice(0, 5).map((article, index) => (
                      <div key={article.id} className="flex items-start space-x-3">
                        <span className="text-lg font-bold text-primary min-w-[24px]">
                          {index + 1}
                        </span>
                        <button
                          onClick={() => handleArticleClick(article)}
                          className="text-sm hover:text-primary transition-colors text-left line-clamp-2"
                        >
                          {article.title}
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
