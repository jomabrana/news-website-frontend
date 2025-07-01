
import React from 'react';
import { Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

interface ArticleCardProps {
  article: Article;
  size?: 'small' | 'medium' | 'large';
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, size = 'medium', onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const cardClasses = {
    small: 'cursor-pointer hover:shadow-lg transition-shadow',
    medium: 'cursor-pointer hover:shadow-lg transition-shadow',
    large: 'cursor-pointer hover:shadow-lg transition-shadow mb-8'
  };

  const imageClasses = {
    small: 'h-40',
    medium: 'h-48',
    large: 'h-64 md:h-80'
  };

  const titleClasses = {
    small: 'text-lg font-semibold',
    medium: 'text-xl font-semibold',
    large: 'text-hierarchy-2'
  };

  return (
    <Card className={cardClasses[size]} onClick={() => onClick(article)}>
      <CardContent className="p-0">
        {/* Article Image */}
        <div className={`relative ${imageClasses[size]} overflow-hidden rounded-t-lg`}>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-4">
          <h3 className={`${titleClasses[size]} text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors`}>
            {article.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          {/* Tags */}
          {size !== 'small' && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
