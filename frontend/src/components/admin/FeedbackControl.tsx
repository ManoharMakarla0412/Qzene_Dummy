
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Search, Filter, Check, X, Send, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Review {
  id: string;
  recipeId: string;
  recipeName: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'published' | 'pending' | 'rejected';
}

interface Question {
  id: string;
  recipeId: string;
  recipeName: string;
  userId: string;
  userName: string;
  question: string;
  date: string;
  status: 'answered' | 'pending';
  answer: string | null;
}

interface ReviewDetailsProps {
  review: Review | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isApproving: boolean;
  isRejecting: boolean;
}

const ReviewDetails = ({ 
  review, 
  onClose, 
  onApprove, 
  onReject,
  isApproving,
  isRejecting 
}: ReviewDetailsProps) => {
  if (!review) return null;

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Review Details</DialogTitle>
        <DialogDescription>
          View and moderate the customer review
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Recipe</Label>
          <div className="col-span-3">{review.recipeName}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">User</Label>
          <div className="col-span-3">{review.userName}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Rating</Label>
          <div className="col-span-3 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
              />
            ))}
            <span className="ml-2">{review.rating} out of 5</span>
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Comment</Label>
          <div className="col-span-3 rounded-md border p-3 text-sm">
            {review.comment}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Date</Label>
          <div className="col-span-3">{new Date(review.date).toLocaleString()}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Status</Label>
          <div className="col-span-3">
            <Badge
              className={
                review.status === 'published'
                  ? "bg-green-100 text-green-800"
                  : review.status === 'pending'
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {review.status}
            </Badge>
          </div>
        </div>
      </div>
      
      <DialogFooter className="flex justify-between">
        <div>
          {review.status === 'pending' && (
            <Button 
              variant="outline" 
              className="text-red-600"
              onClick={() => onReject(review.id)}
              disabled={isRejecting}
            >
              <X className="h-4 w-4 mr-1" />
              {isRejecting ? "Rejecting..." : "Reject"}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {review.status === 'pending' && (
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onApprove(review.id)}
              disabled={isApproving}
            >
              <Check className="h-4 w-4 mr-1" />
              {isApproving ? "Approving..." : "Approve"}
            </Button>
          )}
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

interface QuestionResponseProps {
  question: Question | null;
  onClose: () => void;
  onSubmitAnswer: (id: string, answer: string) => void;
  isSubmitting: boolean;
}

const QuestionResponse = ({ 
  question, 
  onClose, 
  onSubmitAnswer,
  isSubmitting 
}: QuestionResponseProps) => {
  const [answer, setAnswer] = useState(question?.answer || '');

  const handleSubmit = () => {
    if (question && answer.trim()) {
      onSubmitAnswer(question.id, answer);
    }
  };

  if (!question) return null;

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Answer Question</DialogTitle>
        <DialogDescription>
          Respond to the customer question
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Recipe</Label>
          <div className="col-span-3">{question.recipeName}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">User</Label>
          <div className="col-span-3">{question.userName}</div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Question</Label>
          <div className="col-span-3 rounded-md border p-3 text-sm">
            {question.question}
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="answer" className="text-right pt-2">
            Answer
          </Label>
          <Textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="col-span-3"
            rows={4}
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || !answer.trim()}
        >
          <Send className="h-4 w-4 mr-1" />
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const FeedbackControl = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [reviewDetailsOpen, setReviewDetailsOpen] = useState(false);
  const [questionResponseOpen, setQuestionResponseOpen] = useState(false);
  
  // Fetch reviews
  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      // In a real app, you would fetch from a reviews table
      // For demo purposes, using static data
      const mockReviews: Review[] = [
        {
          id: "rev_1",
          recipeId: "rec_1",
          recipeName: "Spaghetti Carbonara",
          userId: "user_1",
          userName: "John Smith",
          rating: 5,
          comment: "This recipe was amazing! Easy to follow and delicious results.",
          date: "2025-04-08",
          status: "published"
        },
        {
          id: "rev_2",
          recipeId: "rec_2",
          recipeName: "Thai Green Curry",
          userId: "user_2",
          userName: "Mary Johnson",
          rating: 4,
          comment: "Great flavor but a bit too spicy for my taste.",
          date: "2025-04-07",
          status: "published"
        },
        {
          id: "rev_3",
          recipeId: "rec_3",
          recipeName: "Classic Beef Burger",
          userId: "user_3",
          userName: "David Thompson",
          rating: 2,
          comment: "The cooking time was way off. My burgers came out burned.",
          date: "2025-04-06",
          status: "pending"
        }
      ];
      
      return mockReviews;
    },
  });

  // Fetch questions
  const { data: questions, isLoading: isQuestionsLoading } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: async () => {
      // In a real app, you would fetch from a questions table
      // For demo purposes, using static data
      const mockQuestions: Question[] = [
        {
          id: "q_1",
          recipeId: "rec_1",
          recipeName: "Spaghetti Carbonara",
          userId: "user_4",
          userName: "Sarah Williams",
          question: "Can I substitute pancetta with bacon?",
          date: "2025-04-08",
          status: "answered",
          answer: "Yes, bacon works great as a substitute!"
        },
        {
          id: "q_2",
          recipeId: "rec_2",
          recipeName: "Thai Green Curry",
          userId: "user_5",
          userName: "Michael Brown",
          question: "How can I make this less spicy but keep the flavor?",
          date: "2025-04-07",
          status: "pending",
          answer: null
        }
      ];
      
      return mockQuestions;
    },
  });

  // Approve review mutation
  const approveReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      // In a real app, update the review in the database
      console.log(`Approving review ${reviewId}`);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: reviewId, status: 'published' };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['admin-reviews'], (old: Review[] | undefined) => 
        old?.map(review => 
          review.id === data.id 
            ? {...review, status: 'published' as const} 
            : review
        )
      );
      toast({
        title: "Review approved",
        description: "The review is now published"
      });
      setReviewDetailsOpen(false);
    }
  });

  // Reject review mutation
  const rejectReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      // In a real app, update the review in the database
      console.log(`Rejecting review ${reviewId}`);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: reviewId, status: 'rejected' };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['admin-reviews'], (old: Review[] | undefined) => 
        old?.map(review => 
          review.id === data.id 
            ? {...review, status: 'rejected' as const} 
            : review
        )
      );
      toast({
        title: "Review rejected",
        description: "The review has been rejected"
      });
      setReviewDetailsOpen(false);
    }
  });

  // Answer question mutation
  const answerQuestionMutation = useMutation({
    mutationFn: async ({ questionId, answer }: { questionId: string, answer: string }) => {
      // In a real app, update the question in the database
      console.log(`Answering question ${questionId} with: ${answer}`);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: questionId, answer, status: 'answered' };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['admin-questions'], (old: Question[] | undefined) => 
        old?.map(question => 
          question.id === data.id 
            ? {...question, answer: data.answer, status: 'answered' as const} 
            : question
        )
      );
      toast({
        title: "Question answered",
        description: "Your response has been published"
      });
      setQuestionResponseOpen(false);
    }
  });

  // Filter reviews based on search
  const filteredReviews = reviews?.filter(review => {
    if (!searchQuery) return true;
    
    return review.recipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           review.comment.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter questions based on search
  const filteredQuestions = questions?.filter(question => {
    if (!searchQuery) return true;
    
    return question.recipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           question.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           question.question.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewReview = (review: Review) => {
    setSelectedReview(review);
    setReviewDetailsOpen(true);
  };

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setQuestionResponseOpen(true);
  };

  const handleApproveReview = (reviewId: string) => {
    approveReviewMutation.mutate(reviewId);
  };

  const handleRejectReview = (reviewId: string) => {
    rejectReviewMutation.mutate(reviewId);
  };

  const handleSubmitAnswer = (questionId: string, answer: string) => {
    answerQuestionMutation.mutate({ questionId, answer });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Feedback Control</h2>
      
      <Tabs defaultValue="reviews">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews Overview</CardTitle>
              <CardDescription>Manage customer reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-sm"
                />
                <Button variant="outline" className="ml-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              {renderReviewsTable(filteredReviews, isReviewsLoading, handleViewReview, handleApproveReview, handleRejectReview)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Questions Overview</CardTitle>
              <CardDescription>Manage customer questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-sm"
                />
                <Button variant="outline" className="ml-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              {renderQuestionsTable(filteredQuestions, isQuestionsLoading, handleViewQuestion)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={reviewDetailsOpen} onOpenChange={setReviewDetailsOpen}>
        <ReviewDetails
          review={selectedReview}
          onClose={() => setReviewDetailsOpen(false)}
          onApprove={handleApproveReview}
          onReject={handleRejectReview}
          isApproving={approveReviewMutation.isPending}
          isRejecting={rejectReviewMutation.isPending}
        />
      </Dialog>

      <Dialog open={questionResponseOpen} onOpenChange={setQuestionResponseOpen}>
        <QuestionResponse
          question={selectedQuestion}
          onClose={() => setQuestionResponseOpen(false)}
          onSubmitAnswer={handleSubmitAnswer}
          isSubmitting={answerQuestionMutation.isPending}
        />
      </Dialog>
    </div>
  );
};

const renderReviewsTable = (
  reviews: Review[] | undefined,
  isLoading: boolean,
  onViewReview: (review: Review) => void,
  onApproveReview: (id: string) => void,
  onRejectReview: (id: string) => void
) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No reviews found</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipe</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.recipeName}</TableCell>
              <TableCell>{review.userName}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{review.rating}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
              <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {review.status === 'published' ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Published
                  </Badge>
                ) : review.status === 'pending' ? (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    Pending
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                    Rejected
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onViewReview(review)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {review.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-green-600"
                        onClick={() => onApproveReview(review.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-red-600"
                        onClick={() => onRejectReview(review.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const renderQuestionsTable = (
  questions: Question[] | undefined,
  isLoading: boolean,
  onViewQuestion: (question: Question) => void
) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!questions || questions.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No questions found</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipe</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.recipeName}</TableCell>
              <TableCell>{question.userName}</TableCell>
              <TableCell className="max-w-xs truncate">{question.question}</TableCell>
              <TableCell>{new Date(question.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {question.status === 'answered' ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Answered
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    Pending
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onViewQuestion(question)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeedbackControl;
