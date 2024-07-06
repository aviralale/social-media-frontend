const authorDetails = {
  id: 4,
  username: "sitetester",
  email: "aviral.sitetester@gmail.com",
  first_name: "Aviral",
  last_name: "Hero",
  follower_count: 1,
  following_count: 1,
  is_verified: false,
  profile_pic:
    "http://127.0.0.1:8000/media/media/user_avatar/438065279_1215865809405912_5372992020956987802_n.jpg",
};

const generateComments = (num) => {
  const comments = [];
  for (let i = 1; i <= num; i++) {
    comments.push({
      id: i,
      author: authorDetails,
      post: 1,
      content: `test comment ${i}`,
      created_at: new Date().toISOString(),
      like_count: Math.floor(Math.random() * 100),
      reply_count: Math.floor(Math.random() * 10),
    });
  }
  return comments;
};

const commentData = generateComments(50);

export default commentData;
