import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { axiosInstance } from "@/auth/auth";
import "./Search.css";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { CheckmarkBadge02Icon } from "@/Icons/Icons";
import MutualConnections from "../components/User/MutualConnections";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ profiles: [], posts: [] });

  const handleSearch = async () => {
    try {
      props.setProgress(10);
      const response = await axiosInstance.get(
        `/api/search/search/?q=${query}`
      );
      setResults(response.data);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="container mx-auto p-4">
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>

      <Tabs defaultValue="profiles" className="mt-4">
        <TabsList>
          <TabsTrigger value="profiles">Profiles</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="profiles">
          {results.profiles.map((profile) => (
            <Card key={profile.id} className="mb-4">
              <CardHeader>
                <Link
                  to={`/vs/${profile.username}`}
                  className="hover:underline"
                >
                  <CardTitle className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={getMediaUrl(profile.profile_pic)}
                        alt={profile.username}
                        className="aspect-square object-cover"
                      />
                      <AvatarFallback>{profile.username[0]}</AvatarFallback>
                    </Avatar>
                    {profile.username}
                    {profile.is_verified && <CheckmarkBadge02Icon />}
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <p>{profile.first_name}</p>
                <MutualConnections
                  username={profile.username}
                  pfpSize={7}
                  isText
                  textSize="sm"
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="posts">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {results.posts.map((post) => (
              <Card key={post.id} className="mb-4">
                <Link to={`/vs/${post.author.username}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage
                          src={getMediaUrl(post.author.profile_pic)}
                          alt={post.author.username}
                          className="aspect-square object-cover"
                        />
                        <AvatarFallback>
                          {post.author.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      {post.author.username}
                      {post.author.is_verified && <CheckmarkBadge02Icon />}
                    </CardTitle>
                  </CardHeader>
                </Link>
                <Link to={`vs/${post.author.username}/posts/${post.id}`}>
                  <CardContent>
                    <p>{post.content}</p>
                    {post.media && post.media.length > 0 && (
                      <img
                        src={getMediaUrl(post.media[0].file)}
                        alt="Post media"
                        className="mt-2 rounded-md w-full"
                      />
                    )}
                    <div className="mt-2">
                      <span className="mr-2">Likes: {post.like_count}</span>
                      <span>Comments: {post.comment_count}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </Masonry>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Search;
