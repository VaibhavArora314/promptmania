"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick, handleUserSelect }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserSelect={handleUserSelect}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;

    setSearchText(query);

    const updatedFilteredPosts = allPosts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(query.toLowerCase()) ||
        post.tag.toLowerCase().includes(query.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(updatedFilteredPosts);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const updatedFilteredPosts = allPosts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setFilteredPosts(updatedFilteredPosts);
  };

  const handleUserSelect = (userId, username) => {
    console.log(session?.user.id, userId, session?.user.id == userId);

    if (session?.user.id == userId) router.push("/profile");
    else router.push(`/profile/${userId}?name=${username}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={filteredPosts}
          handleTagClick={handleTagClick}
          handleUserSelect={handleUserSelect}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          handleUserSelect={handleUserSelect}
        />
      )}
    </section>
  );
};

export default Feed;
