export default interface UserPost {
  post: {
    content: string;
    dateCreated: string;
    numOfReactions: number;
  };
  mediaID: number;
  poster: {
    name: string;
    id: string;
  };
}
