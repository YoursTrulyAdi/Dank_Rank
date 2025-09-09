import React, { useState, useEffect } from "react";
import MemeCard from "../components/MemeCard";
import LeaderboardCard from "../components/LeaderboardCard";
import { db, auth } from "../../firebase/firebase";
import { collection, getDocs, doc, updateDoc, increment, setDoc, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";

function UserDashboard() {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else navigate("/");
        });
        return () => unsubscribe();
    }, [navigate]);

    // Fetch memes + votes
    useEffect(() => {
        const fetchMemesAndVotes = async () => {
            try {
                setLoading(true);
                const memesCollection = collection(db, "memes");
                const memesSnapshot = await getDocs(memesCollection);
                const memesList = memesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                let userVotes = {};
                if (auth.currentUser) {
                    const votesSnapshot = await getDocs(collection(db, "votes"));
                    votesSnapshot.forEach((docSnap) => {
                        const vote = docSnap.data();
                        if (vote.userId === auth.currentUser.uid) {
                            userVotes[vote.memeId] = vote.type;
                        }
                    });
                }

                const memesWithVotes = memesList.map((m) => ({
                    ...m,
                    userVote: userVotes[m.id] || null,
                }));

                setMemes(memesWithVotes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMemesAndVotes();
    }, []);

    const signout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    // Handling delete component
    const handleDeleteMeme = async (memeId) => {
        // Optional: confirm before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this meme?");
        if (!confirmDelete) return;

        try {
            // Delete the meme document from Firestore
            await deleteDoc(doc(db, "memes", memeId));

            // Update local state so the UI removes the meme immediately
            setMemes((prevMemes) => prevMemes.filter((meme) => meme.id !== memeId));

            alert("Meme deleted successfully!");
        } catch (error) {
            console.error("Error deleting meme:", error);
            alert("Failed to delete meme.");
        }
    };

    const handleVote = async (memeId, voteType) => {
        if (!auth.currentUser) return alert("You must be signed in to vote!");
        const userId = auth.currentUser.uid;
        const voteId = `${memeId}_${userId}`;
        const voteRef = doc(db, "votes", voteId);
        const memeRef = doc(db, "memes", memeId);

        try {
            const existingVoteSnap = await getDoc(voteRef);
            let change = voteType === "up" ? 1 : -1;

            if (existingVoteSnap.exists()) {
                const prevType = existingVoteSnap.data().type;
                if (prevType === voteType) return; // ignore same vote
                await setDoc(voteRef, { memeId, userId, type: voteType });
                await updateDoc(memeRef, { voteCount: increment(change * 2) }); // +2/-2
            } else {
                await setDoc(voteRef, { memeId, userId, type: voteType });
                await updateDoc(memeRef, { voteCount: increment(change) });
            }

            setMemes((prev) =>
                prev.map((m) =>
                    m.id === memeId ? { ...m, voteCount: m.voteCount + change, userVote: voteType } : m
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUrl || !title) return alert("Please enter all fields!");
        setLoading(true);

        try {
            await addDoc(collection(db, "memes"), {
                imageUrl,
                postLink: "",
                title,
                voteCount: 0,
                creatorId: user.uid,
                creatorName: user.displayName || "Anonymous"
            });
            alert("Meme uploaded successfully!");
            setImageUrl("");
            setTitle("");
            setShowUploadModal(false);

            setTimeout(() => {
                navigate(0);
            }, 2000);
        } catch (err) {
            console.error(err);
            alert("Error uploading meme!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading memes...</p>;

    return (
        <div>
            <nav className="flex justify-evenly items-center px-6 py-4 shadow-md bg-[#191830]">
                <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                    Dank Rank
                    <img src="/logo.png" alt="logo" className="w-10" />
                </h1>
                <button
                    className="px-4 py-2 rounded-xl bg-[#f75990] text-white font-bold hover:scale-105 transition-transform cursor-pointer"
                    onClick={signout}
                >
                    Sign Out
                </button>
            </nav>

            <main className="bg-[#2d2b55] text-white p-6 min-h-[93vh] flex gap-10 lg:flex-row">
                {/* Profile */}
                <div className="flex flex-col w-[30%] bg-[#191830] rounded-xl shadow-md p-6 items-center justify-center self-start ">
                    {user && (
                        <>
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
                                <img
                                    src={user.photoURL || "/profile_default.png"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center space-y-2">
                                <h2 className="text-3xl font-bold">{user.displayName || "Demo"}</h2>
                                <p className="text-gray-300 text-sm">{user.email || "demo@example.com"}</p>
                                <p className="text-yellow-400 font-semibold">DankRank: Newbie</p>
                            </div>
                        </>
                    )}

                    <hr className="w-[80%] mx-auto border-t-2 border-[#2d2b55] mt-8" />

                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="mt-10 bg-[#f75990] px-6 py-2 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                        Upload Meme
                    </button>

                    <button
                        onClick={() => handleDeleteMeme}
                        className="mt-10 bg-[#f75990] px-6 py-2 mb-4 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                        Delete Meme
                    </button>
                </div>

                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-[#191830] p-6 rounded-xl shadow-xl w-11/12 max-w-md justify-center items-center relative">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-bold mb-4">Upload Meme</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="p-2 rounded"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#f75990] text-white px-4 py-2 rounded-xl transition-transform duration-300 hover:scale-105 cursor-pointer"
                                >
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Memes List */}
                <div className="h-[85vh] basis-[40%] overflow-y-scroll">
                    <div className="bg-[#191830] p-10 shadow-md text-center min-h-0 rounded-xl space-y-9">
                        {memes.map((meme) => (
                            <MemeCard
                                key={meme.id}
                                meme={meme}
                                onUpvote={() => handleVote(meme.id, "up")}
                                onDownvote={() => handleVote(meme.id, "down")}
                                onDelete={handleDeleteMeme}
                            />
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="w-full md:basis-[30%]">
                    <div className="bg-[#191830] p-4 md:p-6 shadow-md rounded-xl">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-white">
                            Leaderboard
                        </h3>
                        {memes
                            .sort((a, b) => b.voteCount - a.voteCount)
                            .slice(0, 5)
                            .map((meme, index) => (
                                <LeaderboardCard key={meme.id} meme={{ ...meme, rank: index + 1 }} />
                            ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

export default UserDashboard;
