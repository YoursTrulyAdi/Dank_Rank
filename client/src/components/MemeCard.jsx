import React, { useState } from "react";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";


function MemeCard({ meme, onUpvote, onDownvote }) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="bg-white dark:bg-[#2d2b55] p-4 rounded-xl shadow-md flex flex-col items-center">

            <div className="mb-4 w-full flex justify-center">
                <img
                    src={meme.url}
                    alt={meme.title}
                    onError={(e) => (e.target.src = "/fallback-image.png")}
                    loading="lazy"
                />
            </div>

            <h3 className="text-2xl font-semibold mb-3">{meme.title}</h3>

            <div className="flex items-center space-x-4">
                <button className="text-green-500 hover:text-green-700" onClick={() => onUpvote(meme.id)}>
                    <img src={upArrow} alt="" className="w-7 transition-transform duration-300 hover:scale-115 cursor-pointer"/>
                </button>
                <span className="font-semibold text-2xl">{meme.voteCount || 0}</span>
                <button className="text-red-500 hover:text-red-700" onClick={() => onDownvote(meme.id)}>
                    <img src={downArrow} alt="" className="w-7 transition-transform duration-300 hover:scale-115 cursor-pointer" />
                </button>
            </div>
        </div>
    );
}

export default MemeCard;