import ReviewList from "./ReviewList";
// import { getReviews } from "../api";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

// 최상위 컴포넌트
export default function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    // items의 배열에서 item.id가 일치하지 않는 원소만 추출해서 새로운 배열을 만든다.
    setItems(nextItems);
  };

  const handleLoad = async (orderQuery) => {
    const { reviews } = await getReviews(orderQuery);
    setItems(reviews);
  };

  // 무한루프 방지
  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

// const [direction, setDirection] = useState(1);
// const handleAscClick = () => setDirection(1);
// const handleDescClick = () => setDirection(-1);
// const sortedItems = items.sort((a, b) => direction * (a.id - b.id));
