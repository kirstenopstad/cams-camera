import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import awardsList from "@/data/AwardsList";

export default function Awards() {
  const [leaveReview, setLeaveReview] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [allReviews, setAllReviews] = useState(false);

  //submits review
  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      name: name,
      rating: rating,
      comment: comment,
      id: v4(),
    };

    //stored locally
    const storedReviews = localStorage.getItem("reviews");
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];

    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    // resets form
    setName("");
    setRating(0);
    setComment("");
    setLeaveReview(false);
  };
  // gets stored review for render
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];

    setReviews(reviews);
  }, []);

  //renders after refresh
  const renderReview = (review) => {
    if (selectedRating === 0 || review.rating === selectedRating) {
      return (
        <div>
          <div
            key={review.id}
            className="card"
            style={{
              backgroundColor: "#1e1e1e",
              opacity: "0.9",
              color: "white",
              height: "8rem",
              margin: "1rem",
              marginTop: "1rem",
              border: "1px solid white",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{review.name}-</h5>
              <h6 className="mb-2 card-subtitle text-muted">
                {getStarRating(review.rating)}
              </h6>
              <p className="card-text">"{review.comment}"</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  // filter by star change
  const handleFilterChange = (event) => {
    setSelectedRating(parseInt(event.target.value));
  };

  function getStarRating(rating) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }

    return <span className="star-rating">{stars}</span>;
  }

  // sort reviews by rating in descending order
  const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);

  // get the top 8 reviews
  const topReviews = sortedReviews.slice(0, 8);

  const renderReviewRows = () => {
    const reviewRows = [];

    // split the reviews into pairs
    const pairs = reviewsToDisplay.reduce(
      (acc, item, index) =>
        index % 2 === 0
          ? [...acc, [item]]
          : [...acc.slice(0, -1), [...acc.slice(-1)[0], item]],
      []
    );

    // render each pair in a row
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const isLastRow = i === pairs.length - 1;

      // handle special case for last row with a single review
      if (isLastRow && pair.length === 1) {
        reviewRows.push(
          <div className="row" key={`row-${i}`}>
            <div className="col-md-6">{renderReview(pair[0])}</div>
          </div>
        );
      } else {
        reviewRows.push(
          <div className="row" key={`row-${i}`}>
            {pair.map((review) => (
              <div className="col-md-6" key={review.id}>
                {renderReview(review)}
              </div>
            ))}
          </div>
        );
      }
    }

    return reviewRows;
  };

  const toggleShowAllReviews = () => setAllReviews((prev) => !prev);
  const reviewsToDisplay = allReviews ? reviews : topReviews;

  return (
    <>
      <h1>Awards!</h1>
      <br />
      <div>
        <div className="row">
          {awardsList.map((award, id) => (
            <div className="col-sm-4" key={id}>
              <div className="card">
                <div className="card-body">
                  <img
                    loading="lazy"
                    src={award.photo}
                    className="card-img-top"
                    alt={award.alt}
                  />
                  <h5 className="card-title">{award.title}</h5>
                  <p className="card-text">{award.blurb}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="image-container bg-cam-gray"
        style={{
          position: "relative",
          backgroundImage: "url(/img/inventory/red-dragon-cinema-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTop: "1rem solid #963e2a",
          borderBottom: "1rem solid #963e2a",
          backgroundBlendMode: "multiply",
        }}
      >
        <div>
          <div
            style={{
              float: "right",
            }}
          >
            <h4 style={{ color: "white" }}>Filter by Rating</h4>
            <select value={selectedRating} onChange={handleFilterChange}>
              <option value="0">All Ratings</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
          <br />
          {reviews.length === 0 ? (
            <p
              style={{
                color: "white",
              }}
            >
              No reviews yet.
            </p>
          ) : (
            <div className="container">
              <div className="relative p-4 text-center text-white top-20 md:top-32 lg:top-1/2">
                <h1
                  style={{
                    color: "white",
                  }}
                >
                  Reviews
                </h1>
                {renderReviewRows()}
                <div className="text-center">
                  <button
                    type="submit"
                    style={{
                      marginBottom: "1rem",
                      marginLeft: "1rem",
                    }}
                    className="color: white text-center px-3 py-0.5 hover:border-cam-gray border-2 font-medium rounded-md hover:text-cam-gray"
                    onClick={toggleShowAllReviews}
                  >
                    {allReviews ? "Show top 8 reviews" : "View all reviews"}
                  </button>
                </div>
                <br />
              </div>
            </div>
          )}
        </div>
        {!leaveReview ? (
          <div
            style={{
              marginBottom: "3rem",
              padding: "auto",
            }}
          >
            <div className="relative p-4 text-center text-white top-20 md:top-32 lg:top-1/2">
              <h2
                style={{
                  color: "white",
                }}
              >
                Have something nice to say?
              </h2>
              <br />
              <button
                className="text-center px-3 py-0.5 hover:border-cam-gray border-2 font-medium rounded-md hover:text-cam-gray"
                style={{ margin: "1rem" }}
                onClick={() => setLeaveReview(true)}
              >
                Leave a Review!
              </button>
            </div>
            <br />
          </div>
        ) : (
          <div>
            <div
              style={{
                backgroundColor: "#757575",
                opacity: "0.8",
                color: "white",
                height: "auto",
                margin: "1rem",
                marginTop: "2rem",
                padding: "auto",
                maxWidth: "15rem",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid white",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    style={{ backgroundColor: "#a3a3a3" }}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="rating">Rating:</label>
                  <br />
                  <select
                    id="rating"
                    value={rating}
                    style={{ backgroundColor: "#a3a3a3" }}
                    onChange={(event) =>
                      setRating(parseInt(event.target.value))
                    }
                  >
                    <option value="0">Select a rating</option>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment">Comment:</label>
                  <br />
                  <textarea
                    id="comment"
                    value={comment}
                    style={{ backgroundColor: "#a3a3a3" }}
                    onChange={(event) => setComment(event.target.value)}
                  ></textarea>
                </div>
                <button className="color: white text-center px-3 py-0.5 hover:border-cam-gray border-2 font-medium rounded-md hover:text-cam-gray">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        <br />
        <hr />
      </div>
    </>
  );
}
