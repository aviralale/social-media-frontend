const postData = {
  id: 1,
  author: {
    id: 3,
    username: "aviral",
    email: "aviralale@gmail.com",
    first_name: "Aviral",
    last_name: "Ale",
    follower_count: 1,
    following_count: 1,
    is_verified: true,
    profile_pic: "http://127.0.0.1:8000/media/user_avatar/peep-57.jpg",
  },
  content: "test",
  media: [
    {
      id: 1,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/20211026_163647.jpg",
    },
    {
      id: 2,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/20211026_163651.jpg",
    },
    {
      id: 3,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/20211026_163652.jpg",
    },
    {
      id: 4,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/20211026_163653.jpg",
    },
    {
      id: 5,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/20211026_163654.jpg",
    },
    {
      id: 6,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/20211026_163655.jpg",
    },
    {
      id: 7,
      post: 1,
      file: "http://127.0.0.1:8000/media/media/posts/deuda3.jpg",
    },
  ],
  created_at: "2024-07-03T15:57:41.372788Z",
  like_count: 2,
  comment_count: 1,
};

export default postData;
