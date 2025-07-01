
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, Share2, Bookmark, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Mock data - same as homepage
  const mockArticles: Article[] = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
      excerpt: "World leaders unite in unprecedented commitment to reduce carbon emissions by 50% over the next decade, marking a turning point in climate action.",
      content: `
        <p>In a landmark decision that could reshape the global response to climate change, world leaders at the International Climate Summit have reached an unprecedented agreement to reduce carbon emissions by 50% over the next decade.</p>
        
        <p>The agreement, signed by representatives from 195 countries, marks the most ambitious commitment to environmental action in history. The summit, held in Geneva, brought together heads of state, environmental scientists, and industry leaders in what many are calling a turning point for global climate policy.</p>
        
        <h3>Key Provisions of the Agreement</h3>
        
        <p>The historic pact includes several groundbreaking provisions:</p>
        
        <ul>
          <li>A binding commitment to reduce carbon emissions by 50% by 2035</li>
          <li>$500 billion in funding for renewable energy infrastructure</li>
          <li>Mandatory carbon pricing mechanisms for all participating nations</li>
          <li>Technology transfer programs to support developing countries</li>
        </ul>
        
        <p>Dr. Elena Rodriguez, the summit's chief scientific advisor, emphasized the urgency of the situation: "This agreement represents our last, best chance to limit global warming to 1.5 degrees Celsius. The science is clear – we must act now, and we must act decisively."</p>
        
        <h3>Industry Response</h3>
        
        <p>The business community has responded with cautious optimism. Major corporations, including tech giants and automotive manufacturers, have already begun announcing their own enhanced commitments to carbon neutrality.</p>
        
        <p>"This agreement provides the certainty and framework that businesses need to make long-term investments in clean technology," said Michael Chang, CEO of GreenTech Industries. "We're ready to do our part."</p>
        
        <h3>Implementation Challenges</h3>
        
        <p>Despite the enthusiasm surrounding the agreement, experts acknowledge significant implementation challenges lie ahead. The transition to renewable energy sources will require massive infrastructure investments and coordinated international cooperation.</p>
        
        <p>Critics also point to the need for more immediate action, arguing that while the agreement is historic, the timeline for implementation may still be too slow to prevent the worst effects of climate change.</p>
        
        <p>The next phase of the agreement will involve detailed national implementation plans, which each country must submit within six months. Regular review sessions will be held annually to track progress and adjust targets as needed.</p>
      `,
      author: "Sarah Johnson",
      publishedAt: "2025-01-01T08:00:00Z",
      category: "World",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
      readTime: 8,
      tags: ["Climate", "Politics", "Environment"]
    },
    // Add more mock articles here for related articles
    {
      id: 2,
      title: "Tech Innovation Drives Economic Growth in Emerging Markets",
      excerpt: "Artificial intelligence and renewable energy sectors show remarkable expansion in developing economies worldwide.",
      content: "Full article content here...",
      author: "Michael Chen",
      publishedAt: "2025-01-01T06:30:00Z",
      category: "Business",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
      readTime: 6,
      tags: ["Technology", "Economy", "Innovation"]
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch article
    const foundArticle = mockArticles.find(a => a.id === parseInt(id || ''));
    if (foundArticle) {
      setArticle(foundArticle);
      // Set related articles (same category, excluding current article)
      const related = mockArticles.filter(a => 
        a.category === foundArticle.category && a.id !== foundArticle.id
      ).slice(0, 3);
      setRelatedArticles(related);
    }

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  const handleArticleClick = (clickedArticle: Article) => {
    navigate(`/article/${clickedArticle.id}`);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-hierarchy-1 mb-6">
              {article.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>By {article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <span>{formatDate(article.publishedAt)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "bg-primary text-primary-foreground" : ""}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div 
              className="leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Author Bio */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{article.author}</h3>
                  <p className="text-muted-foreground">
                    Award-winning journalist with over 10 years of experience covering international affairs and environmental policy. 
                    Previously worked for major news organizations including Reuters and The Associated Press.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-hierarchy-2 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    size="small"
                    onClick={handleArticleClick}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
