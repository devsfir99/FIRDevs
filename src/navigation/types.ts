export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;

  // Main Stack
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