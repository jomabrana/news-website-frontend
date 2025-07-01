
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SortAsc, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ArticleCard from './ArticleCard';

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

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Mock articles for each category
  const mockArticles: Record<string, Article[]> = {
    world: [
      {
        id: 1,
        title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
        excerpt: "World leaders unite in unprecedented commitment to reduce carbon emissions by 50% over the next decade.",
        content: "Full article content...",
        author: "Sarah Johnson",
        publishedAt: "2025-01-01T08:00:00Z",
        category: "World",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        readTime: 8,
        tags: ["Climate", "Politics", "Environment"]
      },
      {
        id: 4,
        title: "Breakthrough in Medical Research Offers Hope for Rare Disease Patients",
        excerpt: "Scientists announce promising results from clinical trials of new gene therapy treatment.",
        content: "Full article content...",
        author: "Dr. James Wilson",
        publishedAt: "2025-01-01T04:00:00Z",
        category: "World",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
        readTime: 7,
        tags: ["Medicine", "Research", "Health"]
      }
    ],
    business: [
      {
        id: 2,
        title: "Tech Innovation Drives Economic Growth in Emerging Markets",
        excerpt: "Artificial intelligence and renewable energy sectors show remarkable expansion in developing economies worldwide.",
        content: "Full article content...",
        author: "Michael Chen",
        publishedAt: "2025-01-01T06:30:00Z",
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
        readTime: 6,
        tags: ["Technology", "Economy", "Innovation"]
      },
      {
        id: 6,
        title: "Financial Markets Show Strong Performance Despite Global Uncertainties",
        excerpt: "Investors remain optimistic as major indices reach new heights driven by technology and healthcare sectors.",
        content: "Full article content...",
        author: "Robert Kim",
        publishedAt: "2024-12-31T20:30:00Z",
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
        readTime: 6,
        tags: ["Finance", "Markets", "Economy"]
      }
    ],
    sports: [
      {
        id: 3,
        title: "Olympic Games Preparation Intensifies as Host City Unveils New Venues",
        excerpt: "State-of-the-art facilities showcase sustainable design principles while preparing to welcome athletes from around the globe.",
        content: "Full article content...",
        author: "Emma Rodriguez",
        publishedAt: "2025-01-01T05:15:00Z",
        category: "Sports",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
        readTime: 5,
        tags: ["Olympics", "Sports", "Architecture"]
      }
    ],
    entertainment: [
      {
        id: 5,
        title: "Hollywood's Biggest Stars Gather for Charity Gala",
        excerpt: "Annual fundraising event raises millions for education initiatives in underserved communities.",
        content: "Full article content...",
        author: "Lisa Thompson",
        publishedAt: "2024-12-31T22:00:00Z",
        category: "Entertainment",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
        readTime: 4,
        tags: ["Entertainment", "Charity", "Celebrities"]
      }
    ],
    politics: [
      {
        id: 7,
        title: "Congressional Leaders Announce Bipartisan Infrastructure Bill",
        excerpt: "New legislation promises to modernize transportation networks and expand broadband access nationwide.",
        content: "Full article content...",
        author: "David Martinez",
        publishedAt: "2024-12-31T18:00:00Z",
        category: "Politics",
        imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
        readTime: 9,
        tags: ["Politics", "Infrastructure", "Bipartisan"]
      }
    ]
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const categoryArticles = mockArticles[category?.toLowerCase() || ''] || [];
      setArticles(categoryArticles);
      setIsLoading(false);
    }, 500);
  }, [category]);

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.id}`);
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      world: "Breaking news and in-depth coverage of global events, international affairs, and worldwide developments.",
      politics: "Political analysis, policy updates, election coverage, and governmental affairs from around the world.",
      business: "Market trends, economic analysis, corporate news, and financial insights for informed decision-making.",
      sports: "Latest scores, athlete profiles, championship coverage, and sports analysis across all major leagues.",
      entertainment: "Celebrity news, movie reviews, music updates, and entertainment industry insights."
    };
    return descriptions[cat.toLowerCase()] || "Latest news and updates in this category.";
  };

  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        return b.readTime - a.readTime; // Mock popularity
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const categoryTitle = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-hierarchy-1 mb-4">{categoryTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {getCategoryDescription(category || '')}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading articles...</p>
          </div>
        )}

        {/* Articles Grid/List */}
        {!isLoading && sortedArticles.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }>
            {sortedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                size={viewMode === 'list' ? 'large' : 'medium'}
                onClick={handleArticleClick}
              />
            ))}
          </div>
        )}

        {/* No Articles */}
        {!isLoading && sortedArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              There are currently no articles in the {categoryTitle} category.
            </p>
            <Button onClick={() => navigate('/')}>
              Browse All News
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
