import HomePosts from "./HomePosts";

export default function Home() {
  return (
    <>
      <h1 className="text-5xl mt-4 yatra-one-regular">VibeSphere</h1>
      <div className="posts-section mt-5 flex">
        <HomePosts />
      </div>
    </>
  );
}
