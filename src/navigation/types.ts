export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Projects: undefined;
  Social: undefined;
  Profile: undefined;
  CreateProject: undefined;
  ProjectDetail: {
    projectId: string;
    projectName: string;
    projectTechnology: string;
    projectDescription: string;
    status: string;
    memberCount: number;
  };
  EditProfile: undefined;
  CreatePost: undefined;
  PostDetail: {
    postId: string;
  };
  Notifications: undefined;
  Search: undefined;
  UserProfile: {
    userId: string;
  };
};