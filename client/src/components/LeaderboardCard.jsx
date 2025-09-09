import React from "react";

function LeaderboardCard({ meme }) {
  return (
    <div className="flex items-center gap-4 bg-[#2d2b55] p-4 my-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 w-full">
      
      {/* Rank */}
      <div className="text-2xl font-bold text-yellow-400 w-10 text-center flex-shrink-0">
        #{meme.rank}
      </div>

      {/* Meme Image */}
      <img
        src={meme.imageUrl}
        alt={meme.title}
        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-600 flex-shrink-0"
      />

      {/* Meme Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-semibold text-white truncate">
          {meme.title}
        </h4>
      </div>

      {/* Votes */}
      <div className="text-pink-400 font-bold text-lg flex-shrink-0">
        🔥 {meme.voteCount}
      </div>
    </div>
  );
}

export default LeaderboardCard;
