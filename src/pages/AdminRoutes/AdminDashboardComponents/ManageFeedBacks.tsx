/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import featureImg from "@/assets/images/features.jpg";
import { BounceLoader } from "react-spinners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashBoardBreadcrumb from "@/components/layouts/layout-items/DashBoardBreadCrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useGetAllQuestionsQuery,
  useReplyQuestionMutation,
} from "@/redux/features/faq/faq.api";

export default function ManageFeedbacks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
  };
  if (searchTerm) query.searchTerm = searchTerm;

  const { data: faqData, isLoading } = useGetAllQuestionsQuery(query);
  const [replyQuestion] = useReplyQuestionMutation();

  const questions = faqData?.data?.data || [];
  const totalPage = faqData?.data?.meta?.totalPage || 1;

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleString() : "N/A";

  const handleReply = (q: any) => {
    setSelectedQuestion(q);
    setDialogOpen(true);
  };

  const handleSubmitReply = async () => {
    if (!answer.trim()) {
      toast.error("Answer cannot be empty");
      return;
    }
    try {
      setIsReplying(true);
      const payload = { answer: answer };
      await replyQuestion({ id: selectedQuestion._id, payload }).unwrap();
      toast.success("Answer submitted successfully!");
      setDialogOpen(false);
      setAnswer("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit answer");
    } finally {
      setIsReplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  return (
    <>
      <section>
        <DashBoardBreadcrumb
          title="Manage Feedbacks"
          description="View and answer all user questions"
          backgroundImage={featureImg}
        />

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <div className="flex-grow min-w-[250px] w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search by question or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-none border border-gray-400 shadow-sm text-sm"
            />
          </div>
        </div>

        {questions.length > 0 ? (
          <div className="max-w-7xl mx-auto p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Asked At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((q: any) => (
                  <TableRow key={q._id}>
                    <TableCell>
                      {q.question.length > 50
                        ? q.question.slice(0, 50) + "..."
                        : q.question}
                    </TableCell>
                    <TableCell>{q.name}</TableCell>
                    <TableCell>{q.email}</TableCell>
                    <TableCell>{formatDate(q.createdAt)}</TableCell>
                    <TableCell>
                      {q.answer ? (
                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100">
                          Replied
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          className="rounded-none text-xs hover:border"
                          disabled={isReplying && selectedQuestion?._id === q._id}
                          onClick={() => handleReply(q)}
                        >
                          {isReplying && selectedQuestion?._id === q._id
                            ? "Replying..."
                            : "Reply"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPage > 1 && (
              <div className="flex justify-end mt-4 w-full">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={
                          currentPage === 1 ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                      (page) => (
                        <PaginationItem
                          key={page}
                          onClick={() => setCurrentPage(page)}
                        >
                          <PaginationLink isActive={currentPage === page}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                        }
                        className={
                          currentPage === totalPage
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">
            No Questions Found
          </p>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg w-full rounded-none">
            <DialogHeader></DialogHeader>
            <DialogTitle>
              <p className="text-sm font-medium">Reply to Question</p>
            </DialogTitle>
            <DialogDescription>
              {selectedQuestion?.question}
            </DialogDescription>
            <div className=" space-y-4">
              <Textarea
                placeholder="Write your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full rounded-none border border-gray-400 shadow-sm text-sm"
              />
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                className="rounded-none hover:bg-accent hover:border"
                variant="destructive"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-none"
                onClick={handleSubmitReply}
                disabled={isReplying}
              >
                {isReplying ? "Submitting..." : "Submit Answer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
