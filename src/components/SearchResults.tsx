
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock search results
  const mockResults: Article[] = [
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
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Filter mock results based on search term
      const filtered = mockResults.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setResults(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    }
  };

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.id}`);
  };

  const categories = ['all', 'World', 'Politics', 'Business', 'Sports', 'Entertainment'];

  const filteredResults = results.filter(article =>
    filterCategory === 'all' || article.category === filterCategory
  );

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'popularity':
        return b.readTime - a.readTime; // Mock popularity based on read time
      default:
        return 0; // Keep original order for relevance
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-hierarchy-2 mb-6">
              {searchParams.get('q') ? `Search Results for "${searchParams.get('q')}"` : 'Search News'}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative max-w-2xl">
                <Input
                  type="text"
                  placeholder="Search for news, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 text-lg py-3"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <SortAsc className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Latest</SelectItem>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {results.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Searching...</p>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && sortedResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedResults.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  size="medium"
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && searchParams.get('q') && sortedResults.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse our categories instead.
              </p>
              <Button onClick={() => navigate('/')}>
                Browse All News
              </Button>
            </div>
          )}

          {/* No Search Query */}
          {!isLoading && !searchParams.get('q') && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Start your search</h3>
              <p className="text-muted-foreground">
                Enter keywords, topics, or author names to find relevant news articles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
