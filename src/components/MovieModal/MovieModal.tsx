import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root");

export default function MovieModal({ movie, onClose }: Props) {
    useEffect(() => {
    const scrollY = window.scrollY;

    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollY}px`;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.removeEventListener("keydown", handleEsc);

      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><b>Release:</b> {movie.release_date}</p>
          <p><b>Rating:</b> {movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}