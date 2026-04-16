"use client";

import { toggleFollowAction } from "@/lib/actions/auth.actions";
import { useState } from "react";

function FollowButton({
  targetUserId,
  isFollowing,
}: {
  targetUserId: string;
  isFollowing: boolean;
}) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const followHandler = async () => {
    if (loading) return;

    setFollowing(!following); 
    setLoading(true);

    try {
      await toggleFollowAction(targetUserId);
    } catch {
      setFollowing(following); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={followHandler}
      disabled={loading}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          following
            ? "border border-purple-500/30 text-purple-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
            : "bg-purple-600 hover:bg-purple-500 text-white"
        }`}
    >
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
