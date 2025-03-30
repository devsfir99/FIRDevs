export type RootStackParamList = {
  // Auth Stack
  Login: undefined;

  
  // Main Stack
  Main: undefined;
  Home: undefined;
  Social: undefined;
  Projects: undefined;
  CreatePost: undefined;
  CreateProject: undefined;
  PostDetail: { postId: string };
  ProjectDetail: { projectId: string };
  Profile: { userId: string };
  EditProfile: undefined;
  Search: undefined;
  Notifications: undefined;
  Settings: undefined;
};