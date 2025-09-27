import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, Camera, Smile, Meh, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealName: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, mealName }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitFeedback } = useGameStore();

  const quickTags = [
    { name: 'Delicious', emoji: '😋', color: 'bg-success' },
    { name: 'Too Spicy', emoji: '🌶️', color: 'bg-destructive' },
    { name: 'Perfect', emoji: '👌', color: 'bg-primary' },
    { name: 'Could be better', emoji: '🤔', color: 'bg-muted' },
    { name: 'Fresh', emoji: '🌿', color: 'bg-success' },
    { name: 'Cold', emoji: '🧊', color: 'bg-blue-500' },
    { name: 'Too salty', emoji: '🧂', color: 'bg-orange-500' },
    { name: 'Great portion', emoji: '🍽️', color: 'bg-purple-500' },
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add to game store
    submitFeedback();
    
    // Reset form
    setRating(0);
    setComment('');
    setSelectedTags([]);
    setIsSubmitting(false);
    onClose();
  };

  const getRatingEmoji = (rating: number) => {
    if (rating >= 4) return <Smile className="w-6 h-6 text-success" />;
    if (rating >= 3) return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Frown className="w-6 h-6 text-destructive" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl glass-card shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/10">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Rate Your Meal</h2>
                <p className="text-muted-foreground">{mealName}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Rating */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">How was your meal?</h3>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-badge fill-current'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {getRatingEmoji(rating)}
                    <span className="text-sm text-muted-foreground">
                      {rating >= 4 ? 'Excellent!' : rating >= 3 ? 'Good' : 'Needs improvement'}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Quick Tags */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Quick feedback</h4>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => (
                    <motion.button
                      key={tag.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagToggle(tag.name)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag.name)
                          ? `${tag.color} text-white shadow-lg`
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <span className="mr-1">{tag.emoji}</span>
                      {tag.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Additional comments (optional)</h4>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  className="w-full h-24 p-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={rating === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;