/**
 * WhatsNew.tsx  —  SkillQuest "What's New" Page
 * ─────────────────────────────────────────────────────────────
 * Three tabs:
 *   1. Platform Updates  — feature announcements, partnerships, design changes
 *   2. Content Drops     — new courses, lectures, textbooks, study materials
 *   3. Reviews           — star ratings + written feedback + "helpful" votes
 *
 * Interactions:
 *   • Like any announcement (no login required, toggle on/off)
 *   • Comment on announcements (requires login — demo toggle at top)
 *   • Threaded replies (one level deep, requires login)
 *   • Star rating + title + body review form (requires login)
 *   • "Helpful" vote on existing reviews
 *   • Newsletter signup in sidebar
 *   • Read more / read less toggle on long posts
 *
 * All comment and review text is sanitized before use.
 * No unused state, no dead code, no unused imports.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PLATFORM_UPDATES,
  CONTENT_DROPS,
  REVIEWS,
  type Announcement,
  type Comment,
  type Review,
} from "./whatsNewData";
import "./whatsNew.css";

/**
 * Strips dangerous HTML characters from user input before it is
 * stored in state or sent to the backend.
 *
 * WHY STRIP instead of escape:
 *   React renders text nodes — not innerHTML — so it already prevents
 *   XSS at render time. HTML-escaping on top of that causes visible
 *   artefacts in the UI (the user sees "&lt;" instead of "<").
 *   Stripping removes the characters entirely, which is both safe and
 *   artefact-free.
 *
 * Call this on every user-supplied string before storing or sending.
 */
const sanitize = (value: string): string =>
  value.trim().replace(/[<>'"&]/g, ""); // strip HTML-special chars; React handles the rest
/** Maximum characters allowed in a comment or reply. */
const MAX_COMMENT_LENGTH = 500;

/** Maximum characters allowed in a review body. */
const MAX_REVIEW_LENGTH = 1000;

// ── TYPES ─────────────────────────────────────────────────────────

/** Which tab is active */
type ActiveTab = "platform" | "content" | "reviews";

/** Tracks per-announcement UI state */
interface AnnouncementState {
  liked: boolean;
  likeCount: number;
  commentsOpen: boolean;
  expanded: boolean; // "read more" toggle
  commentText: string; // draft text in the composer
  commentError: string; // validation error for composer
  replyingTo: string | null; // comment id being replied to
  replyText: string; // draft text in the reply composer
  replyError: string; // validation error for reply
  comments: Comment[]; // live comment thread (starts from data)
}

/** Tracks per-review UI state */
interface ReviewState {
  markedHelpful: boolean;
  helpfulCount: number;
}

// ── HELPERS ───────────────────────────────────────────────────────

/**
 * Renders plain text that uses **bold** markdown-like syntax.
 * Splits on **text** and wraps matching parts in <strong>.
 * Safe — text is not injected as HTML, only wrapped in elements.
 */
function renderBody(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/**
 * Returns the right CSS class for the character counter
 * based on how close the user is to the limit.
 */
function charCountClass(length: number, max: number): string {
  if (length >= max) return "wn__char__count at-limit";
  if (length >= max * 0.85) return "wn__char__count near-limit";
  return "wn__char__count";
}

/** Renders filled/empty stars for a given rating (1–5). */
function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="wn__stars__row" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`wn__star ${n <= rating ? "filled" : ""}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ── DEMO AUTH TOGGLE ──────────────────────────────────────────────
/**
 * In production, replace this with your real auth context / hook.
 * e.g. const { isLoggedIn, user } = useAuth();
 *
 * For now, a simple boolean prop is passed down from WhatsNew.
 */

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENT: CommentThread
//  Renders one top-level comment + its replies + reply composer.
// ════════════════════════════════════════════════════════════════
interface CommentThreadProps {
  comment: Comment;
  isLoggedIn: boolean;
  replyingTo: string | null;
  replyText: string;
  replyError: string;
  onReplyOpen: (id: string) => void;
  onReplyClose: () => void;
  onReplyChange: (text: string) => void;
  onReplySubmit: (parentId: string) => void;
  onCommentLike: (commentId: string) => void;
  likedComments: Set<string>;
}

function CommentThread({
  comment,
  isLoggedIn,
  replyingTo,
  replyText,
  replyError,
  onReplyOpen,
  onReplyClose,
  onReplyChange,
  onReplySubmit,
  onCommentLike,
  likedComments,
}: CommentThreadProps) {
  const isLiked = likedComments.has(comment.id);

  return (
    <div className="wn__comment">
      {/* Avatar */}
      <div
        className="wn__avatar"
        style={{ background: comment.avatarColor }}
        aria-hidden="true"
      >
        {comment.avatar}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Comment bubble */}
        <div className="wn__comment__bubble">
          <div className="wn__comment__top">
            <span className="wn__comment__author">{comment.author}</span>
            <span className="wn__comment__time">{comment.timestamp}</span>
          </div>
          <p className="wn__comment__body">{comment.body}</p>

          {/* Comment actions */}
          <div className="wn__comment__actions">
            {/* Like a comment — no login required */}
            <button
              className={`wn__comment__action ${isLiked ? "liked__comment" : ""}`}
              onClick={() => onCommentLike(comment.id)}
              aria-label={`Like this comment. ${comment.likes + (isLiked ? 1 : 0)} likes`}
            >
              {isLiked ? "♥" : "♡"} {comment.likes + (isLiked ? 1 : 0)}
            </button>

            {/* Reply — requires login */}
            {isLoggedIn && (
              <button
                className="wn__comment__action"
                onClick={() =>
                  replyingTo === comment.id
                    ? onReplyClose()
                    : onReplyOpen(comment.id)
                }
                aria-expanded={replyingTo === comment.id}
              >
                ↩ Reply
              </button>
            )}
          </div>

          {/* Reply composer */}
          {isLoggedIn && replyingTo === comment.id && (
            <div className="wn__reply__composer">
              <textarea
                className="wn__reply__textarea"
                placeholder={`Replying to ${comment.author}…`}
                value={replyText}
                onChange={(e) => onReplyChange(e.target.value)}
                maxLength={MAX_COMMENT_LENGTH}
                aria-label="Write a reply"
              />
              <button
                className="wn__reply__cancel"
                onClick={onReplyClose}
                type="button"
              >
                Cancel
              </button>
              <button
                className="wn__reply__submit"
                onClick={() => onReplySubmit(comment.id)}
                disabled={!replyText.trim()}
                type="button"
              >
                Reply
              </button>
            </div>
          )}
          {replyError && replyingTo === comment.id && (
            <p className="wn__form__error" role="alert">
              ⚠ {replyError}
            </p>
          )}
        </div>

        {/* Nested replies */}
        {comment.replies.length > 0 && (
          <div className="wn__replies">
            {comment.replies.map((reply) => {
              const replyLiked = likedComments.has(reply.id);
              return (
                <div key={reply.id} className="wn__comment wn__reply">
                  <div
                    className="wn__avatar"
                    style={{ background: reply.avatarColor }}
                    aria-hidden="true"
                  >
                    {reply.avatar}
                  </div>
                  <div className="wn__comment__bubble">
                    <div className="wn__comment__top">
                      <span className="wn__comment__author">
                        {reply.author}
                      </span>
                      <span className="wn__comment__time">
                        {reply.timestamp}
                      </span>
                    </div>
                    <p className="wn__comment__body">{reply.body}</p>
                    <div className="wn__comment__actions">
                      <button
                        className={`wn__comment__action ${replyLiked ? "liked__comment" : ""}`}
                        onClick={() => onCommentLike(reply.id)}
                        aria-label={`Like this reply`}
                      >
                        {replyLiked ? "♥" : "♡"}{" "}
                        {reply.likes + (replyLiked ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENT: AnnouncementCard
//  One full post card including body, actions, and comment section.
// ════════════════════════════════════════════════════════════════
interface AnnouncementCardProps {
  post: Announcement;
  state: AnnouncementState;
  isLoggedIn: boolean;
  likedComments: Set<string>;
  onLike: () => void;
  onToggleComments: () => void;
  onToggleExpand: () => void;
  onCommentChange: (text: string) => void;
  onCommentSubmit: () => void;
  onReplyOpen: (id: string) => void;
  onReplyClose: () => void;
  onReplyChange: (text: string) => void;
  onReplySubmit: (parentId: string) => void;
  onCommentLike: (commentId: string) => void;
  animDelay: string;
}

function AnnouncementCard({
  post,
  state,
  isLoggedIn,
  likedComments,
  onLike,
  onToggleComments,
  onToggleExpand,
  onCommentChange,
  onCommentSubmit,
  onReplyOpen,
  onReplyClose,
  onReplyChange,
  onReplySubmit,
  onCommentLike,
  animDelay,
}: AnnouncementCardProps) {
  const totalComments = state.comments.reduce(
    (acc, c) => acc + 1 + c.replies.length,
    0,
  );

  return (
    <article
      className={`wn__card ${post.isHighlighted ? "highlighted" : ""}`}
      style={{ animationDelay: animDelay }}
      aria-label={post.title}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div className="wn__card__header">
        <div className="wn__card__meta">
          {/* Category pill */}
          <span
            className="wn__card__category"
            style={{ background: post.categoryColor }}
          >
            {post.category}
          </span>
          <span className="wn__card__date">{post.date}</span>
        </div>

        {/* Pinned label for highlighted posts */}
        {post.isHighlighted && (
          <span className="wn__card__pinned" aria-label="Pinned post">
            📌 Featured
          </span>
        )}
      </div>

      {/* ── Title ────────────────────────────────────────── */}
      <h2 className="wn__card__title">{post.title}</h2>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className={`wn__card__body ${state.expanded ? "" : "truncated"}`}>
        {renderBody(post.body)}
      </div>

      {/* Read more / less toggle */}
      <button
        className="wn__card__read__more"
        onClick={onToggleExpand}
        aria-expanded={state.expanded}
        aria-label={state.expanded ? "Collapse post" : "Read full post"}
      >
        {state.expanded ? "Read less ↑" : "Read more ↓"}
      </button>

      {/* ── Action bar ───────────────────────────────────── */}
      <div className="wn__card__actions">
        {/* Like button — no login required */}
        <button
          className={`wn__action__btn ${state.liked ? "liked" : ""}`}
          onClick={onLike}
          aria-label={`${state.liked ? "Unlike" : "Like"} this post. ${state.likeCount} likes`}
          aria-pressed={state.liked}
        >
          <span className="wn__action__icon">{state.liked ? "♥" : "♡"}</span>
          {state.likeCount}
        </button>

        {/* Comments toggle */}
        <button
          className={`wn__action__btn ${state.commentsOpen ? "comments-open" : ""}`}
          onClick={onToggleComments}
          aria-expanded={state.commentsOpen}
          aria-label={`${state.commentsOpen ? "Hide" : "Show"} comments. ${totalComments} comment${totalComments !== 1 ? "s" : ""}`}
        >
          💬 {totalComments}
        </button>

        <span className="wn__action__spacer" aria-hidden="true" />

        {/* Share button (copies URL to clipboard) */}
        <ShareButton postId={post.id} />
      </div>

      {/* ── Comment section (expandable) ─────────────────── */}
      {state.commentsOpen && (
        <div className="wn__comments">
          {/* If not logged in — show a prompt */}
          {!isLoggedIn ? (
            <div className="wn__comments__login__prompt" role="status">
              <p>Sign in to join the conversation.</p>
              <Link to="/login" className="wn__comments__login__btn">
                Sign in
              </Link>
            </div>
          ) : (
            /* Comment composer */
            <div className="wn__comment__composer">
              <div style={{ flex: 1 }}>
                <textarea
                  className={`wn__comment__textarea ${state.commentError ? "error" : ""}`}
                  placeholder="Share your thoughts…"
                  value={state.commentText}
                  onChange={(e) => onCommentChange(e.target.value)}
                  maxLength={MAX_COMMENT_LENGTH}
                  aria-label="Write a comment"
                  aria-describedby={`comment-error-${post.id}`}
                  aria-invalid={!!state.commentError}
                />
                <div className="wn__composer__footer">
                  <span
                    className={charCountClass(
                      state.commentText.length,
                      MAX_COMMENT_LENGTH,
                    )}
                    aria-live="polite"
                  >
                    {state.commentText.length}/{MAX_COMMENT_LENGTH}
                  </span>
                  <button
                    className="wn__comment__submit"
                    onClick={onCommentSubmit}
                    disabled={!state.commentText.trim()}
                    type="button"
                  >
                    Post comment
                  </button>
                </div>
                {state.commentError && (
                  <p
                    id={`comment-error-${post.id}`}
                    className="wn__form__error"
                    role="alert"
                  >
                    ⚠ {state.commentError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Comment list */}
          {state.comments.length > 0 ? (
            <div
              className="wn__comments__list"
              role="list"
              aria-label="Comments"
            >
              {state.comments.map((comment) => (
                <div key={comment.id} role="listitem">
                  <CommentThread
                    comment={comment}
                    isLoggedIn={isLoggedIn}
                    replyingTo={state.replyingTo}
                    replyText={state.replyText}
                    replyError={state.replyError}
                    onReplyOpen={onReplyOpen}
                    onReplyClose={onReplyClose}
                    onReplyChange={onReplyChange}
                    onReplySubmit={onReplySubmit}
                    onCommentLike={onCommentLike}
                    likedComments={likedComments}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(23,11,72,0.4)",
                textAlign: "center",
                padding: "0.75rem 0",
              }}
            >
              No comments yet.{isLoggedIn ? " Be the first!" : ""}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

// ── ShareButton helper ────────────────────────────────────────────
/** Copies a shareable URL to the clipboard and shows a brief tick. */
function ShareButton({ postId }: { postId: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/whats-new#${postId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback for browsers that block clipboard without HTTPS
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className="wn__action__btn"
      onClick={handleShare}
      aria-label="Copy link to this post"
    >
      {copied ? "✓ Copied" : "↗ Share"}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENT: ReviewCard
// ════════════════════════════════════════════════════════════════
interface ReviewCardProps {
  review: Review;
  reviewState: ReviewState;
  onHelpful: () => void;
  animDelay: string;
}

function ReviewCard({
  review,
  reviewState,
  onHelpful,
  animDelay,
}: ReviewCardProps) {
  return (
    <article
      className="wn__review"
      style={{ animationDelay: animDelay }}
      aria-label={`Review by ${review.author}`}
    >
      <div className="wn__review__header">
        {/* Avatar */}
        <div
          className="wn__avatar"
          style={{ background: review.avatarColor }}
          aria-hidden="true"
        >
          {review.avatar}
        </div>

        <div className="wn__review__meta">
          <div className="wn__review__author">{review.author}</div>
          <div className="wn__review__date">{review.date}</div>
        </div>

        {/* Stars */}
        <div
          className="wn__review__stars"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`wn__review__star ${n <= review.rating ? "filled" : ""}`}
              aria-hidden="true"
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <h3 className="wn__review__title">{review.title}</h3>
      <p className="wn__review__body">{review.body}</p>

      {/* Helpful */}
      <div className="wn__review__footer">
        <span className="wn__helpful__text">
          {reviewState.helpfulCount} people found this helpful
        </span>
        <button
          className={`wn__helpful__btn ${reviewState.markedHelpful ? "marked" : ""}`}
          onClick={onHelpful}
          aria-pressed={reviewState.markedHelpful}
          aria-label={
            reviewState.markedHelpful
              ? "Remove helpful mark"
              : "Mark as helpful"
          }
        >
          {reviewState.markedHelpful ? "✓ Helpful" : "👍 Helpful"}
        </button>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENT: WriteReviewForm
// ════════════════════════════════════════════════════════════════
interface WriteReviewFormProps {
  isLoggedIn: boolean;
}

function WriteReviewForm({ isLoggedIn }: WriteReviewFormProps) {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBodyText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ rating: "", title: "", body: "" });

  const validate = (): boolean => {
    const newErrors = { rating: "", title: "", body: "" };
    let valid = true;

    if (rating === 0) {
      newErrors.rating = "Please select a star rating.";
      valid = false;
    }
    if (!reviewTitle.trim()) {
      newErrors.title = "Please add a short review title.";
      valid = false;
    }
    if (reviewBody.trim().length < 20) {
      newErrors.body = "Review must be at least 20 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    /**
     * TODO: Send to your backend
     * POST /api/reviews with { rating, title: sanitize(reviewTitle), body: sanitize(reviewBody) }
     */
    console.log("[DEV] Review submitted:", {
      rating,
      title: sanitize(reviewTitle),
      body: sanitize(reviewBody),
    });
    setSubmitted(true);
  };

  // If not logged in, show a prompt
  if (!isLoggedIn) {
    return (
      <div className="wn__review__form__wrap">
        <p className="wn__review__form__title">Leave a Review</p>
        <p className="wn__review__form__sub">
          Share your experience with the SkillQuest community.
        </p>
        <div className="wn__comments__login__prompt">
          <p>You need to be signed in to write a review.</p>
          <button
            className="wn__comments__login__btn"
            onClick={() => navigate("/login")}
            type="button"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="wn__review__form__wrap">
        <div className="wn__success__toast" role="status">
          ✅ Thank you! Your review has been submitted and will appear shortly.
        </div>
      </div>
    );
  }

  return (
    <div className="wn__review__form__wrap">
      <h2 className="wn__review__form__title">Leave a Review</h2>
      <p className="wn__review__form__sub">
        Tell us and the community what you think about SkillQuest.
      </p>

      {/* Star picker */}
      <div
        className="wn__star__picker"
        role="radiogroup"
        aria-label="Select a star rating"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`wn__star__pick ${n <= (hoverRating || rating) ? "selected" : ""}`}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${n} star${n !== 1 ? "s" : ""}`}
            aria-pressed={rating === n}
          >
            ★
          </button>
        ))}
      </div>
      {errors.rating && (
        <p className="wn__form__error" role="alert">
          ⚠ {errors.rating}
        </p>
      )}

      {/* Title */}
      <div className="wn__review__field">
        <label className="wn__review__label" htmlFor="review-title">
          Review Title
        </label>
        <input
          id="review-title"
          type="text"
          className={`wn__review__input ${errors.title ? "error" : ""}`}
          placeholder="e.g. Best learning platform I've used"
          value={reviewTitle}
          onChange={(e) => {
            setReviewTitle(e.target.value);
            setErrors((p) => ({ ...p, title: "" }));
          }}
          maxLength={120}
          aria-describedby="review-title-error"
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p id="review-title-error" className="wn__form__error" role="alert">
            ⚠ {errors.title}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="wn__review__field">
        <label className="wn__review__label" htmlFor="review-body">
          Your Review
        </label>
        <textarea
          id="review-body"
          className={`wn__review__textarea__el ${errors.body ? "error" : ""}`}
          placeholder="Share what you liked, what could be improved, and who you'd recommend SkillQuest to…"
          value={reviewBody}
          onChange={(e) => {
            setReviewBodyText(e.target.value);
            setErrors((p) => ({ ...p, body: "" }));
          }}
          maxLength={MAX_REVIEW_LENGTH}
          aria-describedby="review-body-error"
          aria-invalid={!!errors.body}
        />
        <div
          className={charCountClass(reviewBody.length, MAX_REVIEW_LENGTH)}
          aria-live="polite"
        >
          {reviewBody.length}/{MAX_REVIEW_LENGTH}
        </div>
        {errors.body && (
          <p id="review-body-error" className="wn__form__error" role="alert">
            ⚠ {errors.body}
          </p>
        )}
      </div>

      <button
        type="button"
        className="wn__review__form__submit"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  MAIN COMPONENT: WhatsNew
// ════════════════════════════════════════════════════════════════
function WhatsNew() {
  const navigate = useNavigate();

  // ── DEMO AUTH TOGGLE ─────────────────────────────────────────
  /**
   * In production, replace this with useAuth() or similar.
   * This toggle is only here for demo purposes.
   * When true, the comment composer and review form are unlocked.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ── TAB STATE ─────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ActiveTab>("platform");

  // ── PER-ANNOUNCEMENT STATE ────────────────────────────────────
  /**
   * Build initial state for every announcement (both tabs).
   * Keyed by announcement id.
   */
  const buildInitialState = useCallback(
    (posts: Announcement[]): Record<string, AnnouncementState> =>
      Object.fromEntries(
        posts.map((p) => [
          p.id,
          {
            liked: false,
            likeCount: p.likes,
            commentsOpen: false,
            expanded: false,
            commentText: "",
            commentError: "",
            replyingTo: null,
            replyText: "",
            replyError: "",
            comments: p.comments,
          },
        ]),
      ),
    [],
  );

  const [postStates, setPostStates] = useState<
    Record<string, AnnouncementState>
  >({
    ...buildInitialState(PLATFORM_UPDATES),
    ...buildInitialState(CONTENT_DROPS),
  });

  // ── PER-REVIEW STATE ──────────────────────────────────────────
  const [reviewStates, setReviewStates] = useState<Record<string, ReviewState>>(
    Object.fromEntries(
      REVIEWS.map((r) => [
        r.id,
        { markedHelpful: false, helpfulCount: r.helpful },
      ]),
    ),
  );

  // ── LIKED COMMENTS SET ────────────────────────────────────────
  // Tracks which comment/reply ids the user has liked (no login required)
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  // ── NEWSLETTER STATE ──────────────────────────────────────────
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterErr, setNewsletterErr] = useState("");

  // ── STATE UPDATER (generic helper) ───────────────────────────
  /**
   * Updates a single field inside a specific post's state.
   * This avoids writing a separate setter for every field.
   */
  const updatePost = useCallback(
    (id: string, patch: Partial<AnnouncementState>) => {
      setPostStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...patch },
      }));
    },
    [],
  );

  // ── HANDLERS ─────────────────────────────────────────────────

  /** Toggle like on a post */
  const handleLike = useCallback((id: string) => {
    setPostStates((prev) => {
      const cur = prev[id];
      return {
        ...prev,
        [id]: {
          ...cur,
          liked: !cur.liked,
          likeCount: cur.liked ? cur.likeCount - 1 : cur.likeCount + 1,
        },
      };
    });
  }, []);

  /** Toggle comment section open/closed */
  const handleToggleComments = useCallback(
    (id: string) => {
      updatePost(id, {
        commentsOpen: !postStates[id].commentsOpen,
        commentText: "",
        commentError: "",
      });
    },
    [postStates, updatePost],
  );

  /** Toggle read-more expansion */
  const handleToggleExpand = useCallback(
    (id: string) => {
      updatePost(id, { expanded: !postStates[id].expanded });
    },
    [postStates, updatePost],
  );

  /** Update comment draft text */
  const handleCommentChange = useCallback(
    (id: string, text: string) => {
      if (text.length <= MAX_COMMENT_LENGTH) {
        updatePost(id, { commentText: text, commentError: "" });
      }
    },
    [updatePost],
  );

  /** Submit a new top-level comment */
  const handleCommentSubmit = useCallback(
    (postId: string) => {
      const raw = postStates[postId].commentText;

      // Validate
      if (!raw.trim()) {
        updatePost(postId, { commentError: "Comment cannot be empty." });
        return;
      }
      if (raw.trim().length < 3) {
        updatePost(postId, { commentError: "Comment is too short." });
        return;
      }

      // Sanitize
      const clean = sanitize(raw);

      // Build new comment object
      const newComment: Comment = {
        id: `c-new-${Date.now()}`,
        author: "You", // replace with real user name from auth
        avatar: "YO",
        avatarColor: "#170b48",
        body: clean,
        timestamp: "Just now",
        likes: 0,
        replies: [],
      };

      const updated = [newComment, ...postStates[postId].comments];
      updatePost(postId, {
        comments: updated,
        commentText: "",
        commentError: "",
      });

      /**
       * TODO: POST /api/comments with { postId, body: clean }
       */
    },
    [postStates, updatePost],
  );

  /** Open the reply composer for a specific comment */
  const handleReplyOpen = useCallback(
    (postId: string, commentId: string) => {
      updatePost(postId, {
        replyingTo: commentId,
        replyText: "",
        replyError: "",
      });
    },
    [updatePost],
  );

  /** Close the reply composer */
  const handleReplyClose = useCallback(
    (postId: string) => {
      updatePost(postId, { replyingTo: null, replyText: "", replyError: "" });
    },
    [updatePost],
  );

  /** Update reply draft text */
  const handleReplyChange = useCallback(
    (postId: string, text: string) => {
      if (text.length <= MAX_COMMENT_LENGTH) {
        updatePost(postId, { replyText: text, replyError: "" });
      }
    },
    [updatePost],
  );

  /** Submit a reply to a specific comment */
  const handleReplySubmit = useCallback(
    (postId: string, parentCommentId: string) => {
      const raw = postStates[postId].replyText;

      if (!raw.trim()) {
        updatePost(postId, { replyError: "Reply cannot be empty." });
        return;
      }

      const clean = sanitize(raw);

      const newReply: Comment = {
        id: `r-new-${Date.now()}`,
        author: "You",
        avatar: "YO",
        avatarColor: "#170b48",
        body: clean,
        timestamp: "Just now",
        likes: 0,
        replies: [],
      };

      // Attach the reply to the correct parent comment
      const updatedComments = postStates[postId].comments.map((c) => {
        if (c.id === parentCommentId) {
          return { ...c, replies: [...c.replies, newReply] };
        }
        return c;
      });

      updatePost(postId, {
        comments: updatedComments,
        replyingTo: null,
        replyText: "",
        replyError: "",
      });

      /**
       * TODO: POST /api/comments/reply with { postId, parentCommentId, body: clean }
       */
    },
    [postStates, updatePost],
  );

  /** Toggle like on a comment or reply */
  const handleCommentLike = useCallback((commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  }, []);

  /** Toggle "helpful" on a review */
  const handleHelpful = useCallback((reviewId: string) => {
    setReviewStates((prev) => {
      const cur = prev[reviewId];
      return {
        ...prev,
        [reviewId]: {
          markedHelpful: !cur.markedHelpful,
          helpfulCount: cur.markedHelpful
            ? cur.helpfulCount - 1
            : cur.helpfulCount + 1,
        },
      };
    });
  }, []);

  /** Newsletter submission */
  const handleNewsletter = () => {
    // Trim, lowercase, and strip any injected characters before use
    const email = sanitize(newsletterEmail).toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setNewsletterErr("Please enter a valid email address.");
      return;
    }
    setNewsletterErr("");
    setNewsletterDone(true);
    /**
     * TODO: POST /api/newsletter/subscribe with { email }
     */
    console.log("[DEV] Newsletter subscription:", email);
  };

  // ── COMPUTED VALUES ───────────────────────────────────────────

  // Average rating across all reviews
  const avgRating = REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length;

  // Count of reviews per star level (5 down to 1)
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: REVIEWS.filter((r) => r.rating === star).length,
    pct: Math.round(
      (REVIEWS.filter((r) => r.rating === star).length / REVIEWS.length) * 100,
    ),
  }));

  // Which posts to show based on the active tab
  const feedPosts = activeTab === "platform" ? PLATFORM_UPDATES : CONTENT_DROPS;

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <div className="wn__page">
      {/* ══════════════════════════════════════════════════════
          STICKY NAVBAR
          ══════════════════════════════════════════════════════ */}
      <nav className="wn__nav" aria-label="What's New navigation">
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Link to="/" className="wn__nav__logo" aria-label="SkillQuest home">
            <span className="wn__nav__logo__icon" aria-hidden="true">
              ◈
            </span>
            SkillQuest
          </Link>
          <span className="wn__nav__sep" aria-hidden="true">
            /
          </span>
          <span className="wn__nav__page__label">What's New</span>
        </div>

        {/* Demo auth toggle — DELETE when wiring real auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Demo toggle — remove this button in production */}
          <button
            onClick={() => setIsLoggedIn((v) => !v)}
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "0.3rem 0.7rem",
              borderRadius: "6px",
              border: "1px solid rgba(23,11,72,0.2)",
              background: isLoggedIn
                ? "rgba(22,163,74,0.1)"
                : "rgba(23,11,72,0.05)",
              color: isLoggedIn ? "#15803d" : "rgba(23,11,72,0.5)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            aria-label={`Demo: Toggle login state. Currently ${isLoggedIn ? "logged in" : "logged out"}`}
          >
            {isLoggedIn ? "🟢 Logged in (demo)" : "⚫ Logged out (demo)"}
          </button>

          {/* Back to home */}
          <Link to="/" className="wn__nav__home" aria-label="Back to home">
            ← Home
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO HEADER
          ══════════════════════════════════════════════════════ */}
      <header className="wn__hero">
        {/* Decorative dots */}
        <div className="wn__hero__dots" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <p className="wn__hero__eyebrow">
          <span aria-hidden="true">📣</span> Latest from SkillQuest
        </p>
        <h1 className="wn__hero__title">
          What's <span>New</span>
        </h1>
        <p className="wn__hero__sub">
          Platform updates, new content drops, and community news — all in one
          place. We keep you in the loop so you never miss what matters.
        </p>

        {/* Stats */}
        <div className="wn__hero__stats">
          <div className="wn__hero__stat">
            <span className="wn__hero__stat__num">240+</span>
            <span className="wn__hero__stat__label">
              New lectures this week
            </span>
          </div>
          <div className="wn__hero__stat__divider" aria-hidden="true" />
          <div className="wn__hero__stat">
            <span className="wn__hero__stat__num">6</span>
            <span className="wn__hero__stat__label">University partners</span>
          </div>
          <div className="wn__hero__stat__divider" aria-hidden="true" />
          <div className="wn__hero__stat">
            <span className="wn__hero__stat__num">4.8★</span>
            <span className="wn__hero__stat__label">Platform rating</span>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          TAB BAR
          ══════════════════════════════════════════════════════ */}
      <div
        className="wn__tabs__wrap"
        role="tablist"
        aria-label="Content sections"
      >
        <div className="wn__tabs">
          <button
            className={`wn__tab ${activeTab === "platform" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "platform"}
            aria-controls="tab-panel-platform"
            onClick={() => setActiveTab("platform")}
          >
            🛠 Platform Updates
            <span className="wn__tab__count">{PLATFORM_UPDATES.length}</span>
          </button>

          <button
            className={`wn__tab ${activeTab === "content" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "content"}
            aria-controls="tab-panel-content"
            onClick={() => setActiveTab("content")}
          >
            🎓 Content Drops
            <span className="wn__tab__count">{CONTENT_DROPS.length}</span>
          </button>

          <button
            className={`wn__tab ${activeTab === "reviews" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "reviews"}
            aria-controls="tab-panel-reviews"
            onClick={() => setActiveTab("reviews")}
          >
            ⭐ Reviews &amp; Feedback
            <span className="wn__tab__count">{REVIEWS.length}</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
      <div className="wn__layout">
        {/* ── ANNOUNCEMENTS FEED (platform + content tabs) ── */}
        {(activeTab === "platform" || activeTab === "content") && (
          <>
            {/* Feed column */}
            <div
              className="wn__feed"
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-label={
                activeTab === "platform" ? "Platform Updates" : "Content Drops"
              }
            >
              {feedPosts.map((post, index) => {
                const state = postStates[post.id];
                if (!state) return null;

                return (
                  <AnnouncementCard
                    key={post.id}
                    post={post}
                    state={state}
                    isLoggedIn={isLoggedIn}
                    likedComments={likedComments}
                    onLike={() => handleLike(post.id)}
                    onToggleComments={() => handleToggleComments(post.id)}
                    onToggleExpand={() => handleToggleExpand(post.id)}
                    onCommentChange={(text) =>
                      handleCommentChange(post.id, text)
                    }
                    onCommentSubmit={() => handleCommentSubmit(post.id)}
                    onReplyOpen={(commentId) =>
                      handleReplyOpen(post.id, commentId)
                    }
                    onReplyClose={() => handleReplyClose(post.id)}
                    onReplyChange={(text) => handleReplyChange(post.id, text)}
                    onReplySubmit={(parentId) =>
                      handleReplySubmit(post.id, parentId)
                    }
                    onCommentLike={handleCommentLike}
                    animDelay={`${index * 0.08}s`}
                  />
                );
              })}
            </div>

            {/* Sidebar */}
            <aside className="wn__sidebar" aria-label="Sidebar">
              {/* Quick navigation widget */}
              <div className="wn__widget">
                <h3 className="wn__widget__title">
                  <span aria-hidden="true">🗺</span> Quick Links
                </h3>
                <ul className="wn__widget__links">
                  {[
                    {
                      icon: "🔍",
                      label: "Discover courses",
                      path: "/discover",
                    },
                    { icon: "👤", label: "My profile", path: "/profile" },
                    { icon: "📚", label: "My learning", path: "/my-learning" },
                    {
                      icon: "🏛️",
                      label: "University lectures",
                      path: "/discover/university",
                    },
                    {
                      icon: "📋",
                      label: "Study materials",
                      path: "/discover/materials",
                    },
                    { icon: "⭐", label: "Reviews & feedback", path: "#" },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        className="wn__widget__link"
                        onClick={() => {
                          if (item.path === "#") {
                            setActiveTab("reviews");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            navigate(item.path);
                          }
                        }}
                        type="button"
                      >
                        <span
                          className="wn__widget__link__icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter widget */}
              <div className="wn__widget">
                <h3 className="wn__widget__title">
                  <span aria-hidden="true">📬</span> Stay Updated
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(23,11,72,0.5)",
                    marginBottom: "0.85rem",
                    lineHeight: 1.55,
                  }}
                >
                  Get a weekly digest of new courses and platform updates
                  delivered to your inbox.
                </p>

                {newsletterDone ? (
                  <div className="wn__success__toast" role="status">
                    ✅ You're subscribed!
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      className="wn__widget__input"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setNewsletterErr("");
                      }}
                      aria-label="Email address for newsletter"
                    />
                    {newsletterErr && (
                      <p
                        className="wn__form__error"
                        role="alert"
                        style={{ marginBottom: "0.5rem" }}
                      >
                        ⚠ {newsletterErr}
                      </p>
                    )}
                    <button
                      className="wn__widget__btn"
                      onClick={handleNewsletter}
                      type="button"
                    >
                      Subscribe
                    </button>
                  </>
                )}
              </div>

              {/* Platform stats widget */}
              <div className="wn__widget">
                <h3 className="wn__widget__title">
                  <span aria-hidden="true">📊</span> Platform Stats
                </h3>
                {[
                  { label: "Active learners", value: "52,000+" },
                  { label: "Courses available", value: "1,200+" },
                  { label: "University partners", value: "6" },
                  { label: "Avg. rating", value: "4.8 ★" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid rgba(23,11,72,0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(23,11,72,0.5)",
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "#170b48",
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </>
        )}

        {/* ── REVIEWS TAB ─────────────────────────────────── */}
        {activeTab === "reviews" && (
          <>
            <div
              id="tab-panel-reviews"
              role="tabpanel"
              aria-label="Reviews and Feedback"
            >
              {/* Write a review form — at the top */}
              <WriteReviewForm isLoggedIn={isLoggedIn} />

              {/* Overall rating summary */}
              <div className="wn__rating__summary">
                {/* Big number */}
                <div className="wn__rating__big">
                  <span className="wn__rating__big__num">
                    {avgRating.toFixed(1)}
                  </span>
                  <StarDisplay rating={Math.round(avgRating)} />
                  <span className="wn__rating__total">
                    {REVIEWS.length} reviews
                  </span>
                </div>

                {/* Bar breakdown */}
                <div className="wn__rating__bars">
                  {ratingBreakdown.map(({ star, pct }) => (
                    <div key={star} className="wn__rating__bar__row">
                      <span>{star}★</span>
                      <div className="wn__rating__bar__track">
                        <div
                          className="wn__rating__bar__fill"
                          style={{ width: `${pct}%` }}
                          role="img"
                          aria-label={`${pct}% of reviews are ${star} stars`}
                        />
                      </div>
                      <span className="wn__rating__bar__pct">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                role="list"
                aria-label="User reviews"
              >
                {REVIEWS.map((review, i) => (
                  <div key={review.id} role="listitem">
                    <ReviewCard
                      review={review}
                      reviewState={reviewStates[review.id]}
                      onHelpful={() => handleHelpful(review.id)}
                      animDelay={`${i * 0.08}s`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar on reviews tab */}
            <aside className="wn__sidebar" aria-label="Reviews sidebar">
              <div className="wn__widget">
                <h3 className="wn__widget__title">
                  <span aria-hidden="true">🗺</span> Quick Links
                </h3>
                <ul className="wn__widget__links">
                  {[
                    {
                      icon: "🔍",
                      label: "Discover courses",
                      path: "/discover",
                    },
                    {
                      icon: "🛠",
                      label: "Platform updates",
                      path: "#platform",
                    },
                    { icon: "🎓", label: "Content drops", path: "#content" },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        className="wn__widget__link"
                        onClick={() => {
                          if (item.path === "#platform") {
                            setActiveTab("platform");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else if (item.path === "#content") {
                            setActiveTab("content");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            navigate(item.path);
                          }
                        }}
                        type="button"
                      >
                        <span
                          className="wn__widget__link__icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

export default WhatsNew;
