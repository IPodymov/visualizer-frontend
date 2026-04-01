import { type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
  type FavoritePlan,
} from "@/features/user-preferences/model/slice";
import type { RootState } from "@/app/store/store";
import type { AcademicPlan } from "@/entities/plan/model/types";

type ToggleFavoriteButtonProps = {
  plan: AcademicPlan;
  specialtyName?: string;
  className?: string;
};

export const ToggleFavoriteButton = ({
  plan,
  specialtyName,
  className,
}: ToggleFavoriteButtonProps) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    selectIsFavorite(state, plan.id),
  );

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside Link
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(plan.id));
    } else {
      const favoritePlan: FavoritePlan = { ...plan, specialtyName };
      dispatch(addFavorite(favoritePlan));
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`favorite-btn ${isFavorite ? "active" : ""} ${className || ""}`}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        color: isFavorite ? "#ffc107" : "#ccc",
        transition: "color 0.2s",
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
