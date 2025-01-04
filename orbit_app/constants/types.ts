export interface HashtagItem {
    id: string;
    tag: string;
    image: string;
    count: number;
  }
  
  export interface CommunityItem {
    location: string;
    postsPerDay: number;
    id: string;
    title: string;
    subtitle: string;
    image: string;
  }
  
  export interface NomadProfileType {
    followers: number;
    id: string;
    username: string;
    avatar: string;
  }