import React, { useState } from "react";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";
import { auth } from "../../firebase/firebase";

function MemeCard({ meme, onUpvote, onDownvote }) {
    const handleUpvote = () => {
        if (!auth.currentUser) {
            alert("You must sign in first to vote!");
            return;
        }
        onUpvote(meme.id); // 👈 passes meme.id to parent
    };

    const handleDownvote = () => {
        if (!auth.currentUser) {
            alert("You must sign in first to vote!");
            return;
        }
        onDownvote(meme.id); // 👈 passes meme.id to parent
    };

    return (
        <div className="bg-white dark:bg-[#2d2b55] p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="mb-4 w-full flex justify-center">
                <img
                    src={meme.imageUrl}
                    alt={meme.title}
                    onError={(e) => (e.target.src = "/fallback-image.png")}
                    loading="lazy"
                />
            </div>

            <h3 className="text-2xl font-semibold mb-3">{meme.title}</h3>

            <div className="flex items-center space-x-4">
                <button
                    className={`px-3 py-2 rounded-lg transition duration-300 ${meme.userVote === "up"
                            ? "bg-[#f75990] text-white"  // highlighted if upvoted
                            : "text-green-500 hover:text-green-700"
                        }`}
                    onClick={handleUpvote}
                >
                    <img
                        src={upArrow}
                        alt="up"
                        className="w-7 transition-transform duration-300 hover:scale-115 cursor-pointer"
                    />
                </button>

                <span className="font-semibold text-2xl">{meme.voteCount || 0}</span>

                <button
                    className={`px-3 py-2 rounded-lg transition duration-300 ${meme.userVote === "down"
                            ? "bg-[#f75990] text-white"  // highlighted if downvoted
                            : "text-red-500 hover:text-red-700"
                        }`}
                    onClick={handleDownvote}
                >
                    <img
                        src={downArrow}
                        alt="down"
                        className="w-7 transition-transform duration-300 hover:scale-115 cursor-pointer"
                    />
                </button>
            </div>
        </div>
    );
}

export default MemeCard;
