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
const reviewsPerRow = 2;
const reviewRows = reviews.length > 0 ? 
  Array.from({ length: Math.ceil(reviews.length / reviewsPerRow) }, (_, i) => reviews.slice(i * reviewsPerRow, i * reviewsPerRow + reviewsPerRow)) 
    : [];


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
        <div class="col-sm-5">
        <div key={review.id} class="card">
            <div class="card-body">
                <h5 class="card-title">{review.name}-</h5>
                <h6 class="card-subtitle mb-2 text-muted">{getStarRating(review.rating)}</h6>
                <p class="card-text">"{review.comment}"</p>
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



    return (
        <>
        <h1>Awards!</h1>
        <br/>
        <div>
        <div class="row">
            {awardsList.map((award, id) =>(
                <div class="col-sm-4" key={id}>
                <div class="card">
                <div class="card-body">
                    <img src={award.photo} class="card-img-top" alt={award.alt} />
                    <h5 class="card-title">{award.title}</h5>
                    <p class="card-text">{award.blurb}</p>
                </div>
                </div>
            </div>
            ))}
            </div>
        </div>
        <div>
            <h2>Reviews</h2>
            <div>
            <h4>Filter by Rating</h4>
            <select value={selectedRating} onChange={handleFilterChange}>
                <option value="0">All Ratings</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>
            </div>
            {reviews.length === 0 ? (
            <p>No reviews yet.</p>
            ) :  (
                reviewRows.map((rowReviews, index) => (
                    <div key={index} class="row">
                        {rowReviews.map(renderReview)}
                    </div>
                )))}
        </div>
        {!leaveReview ? (
        <div>
        <h2>Have something nice to say?</h2>
        <button onClick={() => setLeaveReview(true)}>Leave a Review!</button>
        </div>) 
        : (<div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
            <label htmlFor="rating">Rating:</label>
                <select
                id="rating"
                value={rating}
                onChange={(event) => setRating(parseInt(event.target.value))}
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
                <textarea
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ></textarea>
            </div>
            <button type="submit">Submit</button>
            </form>
            </div>
        )}
        <hr />
        <br />
        <hr />
        <br/>
        <hr />
        </>
    )
}
