import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import award1 from './../../public/img/awards/Award1.png';



export default function Awards() {
const [leaveReview, setLeaveReview] = useState(false);
const [name, setName] = useState("");
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const [reviews, setReviews] = useState([]);




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

    setName("");
    setRating(0);
    setComment("");

};

useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];

    setReviews(reviews);
}, []);

//renders after refresh
const renderReview = (review) => {
    return (
    <div key={review.id}>
    <hr />
    <p>Rating: {review.rating}</p>
    <p>Review: "{review.comment}" ~ {review.name}</p>
    </div>
);
};



    return (
        <>

        <h1>Awards and Reviews!</h1>
        <br/>
        {/* awards */}
        <div class="card" style={{width: `30%`}}>
        <img src={award1} class="card-img-top" alt="an award" />
        <div class="card-body">
            <h5 class="card-title">Local Business award</h5>
            <p class="card-text">Local business award we won in 20XX</p>
        </div>
        </div>

        {/* <p>"My nephew uses them, he hasn't complained yet. So, they must be good!" ~ Steven Spielberg</p>
        <p>"My grandson is the best" ~ Cam's Granny Meemaw</p>
        <p>"Great equipment, at a good price." ~ 2018 Oscar Nominated Cinematographer Rachel Morris</p> */}
        {!leaveReview ? (
        <button onClick={() => setLeaveReview(true)}>Leave a Review!</button>) 
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
            <div>
            <h2>All Reviews</h2>
            {reviews.map(renderReview)}
            </div>
            
        <hr />
        </>
        
    )
}