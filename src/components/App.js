import ReviewList from "./ReviewList";
// import { getReviews } from "../api";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

const LIMIT = 6;
// 최상위 컴포넌트
export default function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    // items의 배열에서 item.id가 일치하지 않는 원소만 추출해서 새로운 배열을 만든다.
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    const { reviews, paging } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  // 무한루프 방지
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT }); // 콜백 함수
  }, [order]); // 디펜더시리스트

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      <button disabled={!hasNext} onClick={handleLoadMore}>
        더 보기
      </button>
    </div>
  );
}

// const [direction, setDirection] = useState(1);
// const handleAscClick = () => setDirection(1);
// const handleDescClick = () => setDirection(-1);
// const sortedItems = items.sort((a, b) => direction * (a.id - b.id));
