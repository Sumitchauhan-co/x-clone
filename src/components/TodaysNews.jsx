import React from "react";
import { useEffect, useState } from "react";
import { formatPostTime } from "../utils/time";

export default function HeadlineNews() {
  const [articles, setArticles] = useState([]);
  const [visible, setVisible] = useState(true);
  const [limit, setLimit] = useState(3);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleShowMore = () => {
    setLimit(5);
    setHidden(true);
  };

  useEffect(() => {
    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=${limit}&apikey=03873c3ec6579df98746bf9a5e81eb87`; 

    // https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=${limit}&apikey=03873c3ec6579df98746bf9a5e81eb87

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      });
  }, [limit]);

  if (loading) return(
  <div className="h-full w-full flex justify-center items-center">
    <div className="h-7 w-7 border-4 rounded-[50%] border-blue-950 border-t-blue-400 animate-spin"></div>
  </div>);
  return (
    <>
      {visible && (
        <div className="h-fit w-full border-(--border-color) border rounded-2xl">
          <div className="h-12 w-ful p-3 flex">
            <span className="h-full w-full text-(--current-color) text-xl font-bold flex justify-start items-center">
              Todays's News
            </span>
            <div
              onClick={() => setVisible(false)}
              className="h-full flex justify-end items-center fill-(--current-color)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </div>
          </div>

          {articles.map((article, i) => (
            <div
              key={i}
              className="h-fit w-full p-3 hover:bg-neutral-950 cursor-pointer"
            >
              <p className="h-[75%] w-full flex justify-start items-center text-wrap text-(--current-color) font-semibold">
                {article.title}
              </p>
              <p className="h-[25%] w-full flex justify-start items-center text-wrap text-neutral-500 text-[0.8rem]">
                {formatPostTime(article.publishedAt)}
              </p>
            </div>
          ))}
          <div
            className={`h-12 w-full p-3 hover:bg-neutral-950 flex justify-start items-center text-blue-400 text-[0.9rem] cursor-pointer ${
              hidden ? "hidden" : "block"
            }`}
          >
            <span onClick={handleShowMore}>Show more</span>
          </div>
        </div>
      )}
    </>
  );
}
