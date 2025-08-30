import React, { useState, useEffect } from "react";
import { parseISO, isValid, format } from "date-fns";
import NewsModel from "../Homepage/FootballMatchModel/NewsModel";
import "./NewsComponent.css";
import { Pagination } from "./Pagination"; // import your pagination component
import CommentComponent from "./CommentComponent";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // show 1 news per page

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/news");
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        const newsObjs = data.map((n) => NewsModel.fromJson(n));
        setNews(newsObjs);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (!news.length) return <p>No news found.</p>;

  // pagination logic
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  // change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="News-container">
      {currentNews.map((item) => {
        let parsedDate = parseISO(item.publishedDate);
        if (!isValid(parsedDate) && item.publishedDate.includes("-")) {
          const [day, month, year] = item.publishedDate.split("-");
          parsedDate = new Date(`${year}-${month}-${day}`);
        }
        const formattedDate = isValid(parsedDate)
          ? format(parsedDate, "PPP")
          : "Invalid date";

        return (
          <div key={item.id} className="news-item">
            <h2 className="news-title">{item.title}</h2>
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ maxWidth: "100%" }}
            />
            <p className="news-description">{item.description}</p>
            <p className="publishedDate">Date: {formattedDate}</p>

            {/* ✅ Pass correct ID here */}
            <CommentComponent newsId={item.id} />
          </div>
        );
      })}

      {/* show pagination below the news list */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default NewsComponent;
