export default interface UserPost {
  post: {
    id: number;
    content: string;
    dateCreated: string;
    numOfReactions: number;
  };
  mediaID: number;
  user: {
    name: string;
    id: string;
  };
}
