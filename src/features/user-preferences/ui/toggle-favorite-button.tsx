import { type MouseEvent } from "react";
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/entities/plan/api/plan-api";
import { useAuth } from "@/entities/session/model/use-auth";

type ToggleFavoriteButtonProps = {
  planId: number;
  className?: string;
};

export const ToggleFavoriteButton = ({
  planId,
  className,
}: ToggleFavoriteButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { data: favorites } = useGetFavoritesQuery(undefined, { skip: !isAuthenticated });
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemoving }] = useRemoveFavoriteMutation();

  const isFavorite = favorites?.some((f) => f.id === planId) ?? false;
  const isLoading = isAdding || isRemoving;

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || isLoading) return;

    if (isFavorite) {
      void removeFavorite(planId);
    } else {
      void addFavorite(planId);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`favorite-btn ${isFavorite ? "active" : ""} ${className || ""}`}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      style={{
        background: "none",
        border: "none",
        cursor: isLoading ? "wait" : "pointer",
        padding: "8px",
        color: isFavorite ? "#ffc107" : "#ccc",
        transition: "color 0.2s",
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
};
