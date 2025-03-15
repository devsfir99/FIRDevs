import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import type { RouteProp } from '@react-navigation/native';

// Logo import
import ProjectsLogo from '../../assets/projects.png';

type ProjectDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProjectDetail'>;
type ProjectDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProjectDetail'>;

const ProjectDetailScreen = () => {
  const navigation = useNavigation<ProjectDetailScreenNavigationProp>();
  const route = useRoute<ProjectDetailScreenRouteProp>();
  const { projectName, projectTechnology, projectDescription, status, memberCount } = route.params;

  const [selectedTab, setSelectedTab] = useState<'overview' | 'tasks' | 'members'>('overview');

  const tasks = [
    { id: '1', title: 'UI Tasarımı', status: 'completed', assignee: 'Ahmet Y.' },
    { id: '2', title: 'API Entegrasyonu', status: 'in_progress', assignee: 'Mehmet K.' },
    { id: '3', title: 'Test Yazımı', status: 'todo', assignee: 'Ayşe D.' },
  ];

  const members = [
    { id: '1', name: 'Ahmet Yılmaz', role: 'Takım Lideri', avatar: null },
    { id: '2', name: 'Mehmet Kaya', role: 'Frontend Geliştirici', avatar: null },
    { id: '3', name: 'Ayşe Demir', role: 'Backend Geliştirici', avatar: null },
  ];

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proje Bilgileri</Text>
        <View style={styles.infoRow}>
          <Icon name="code-tags" size={20} color="#1a73e8" />
          <Text style={styles.infoText}>{projectTechnology}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="information" size={20} color="#1a73e8" />
          <Text style={styles.infoText}>{projectDescription}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="account-group" size={20} color="#1a73e8" />
          <Text style={styles.infoText}>{memberCount} Üye</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proje Durumu</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
          <Text style={styles.progressText}>%65 Tamamlandı</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
        <View style={styles.activityItem}>
          <Icon name="source-commit" size={20} color="#1a73e8" />
          <Text style={styles.activityText}>Mehmet yeni bir commit pushladı</Text>
          <Text style={styles.activityTime}>2s önce</Text>
        </View>
        <View style={styles.activityItem}>
          <Icon name="task" size={20} color="#4CAF50" />
          <Text style={styles.activityText}>Ayşe bir görevi tamamladı</Text>
          <Text style={styles.activityTime}>1s önce</Text>
        </View>
      </View>
    </View>
  );

  const renderTasks = () => (
    <View style={styles.tasksContainer}>
      {tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          <View style={styles.taskHeader}>
            <View style={styles.taskStatus}>
              <Icon 
                name={
                  task.status === 'completed' ? 'check-circle' : 
                  task.status === 'in_progress' ? 'progress-clock' : 'clock-outline'
                } 
                size={20} 
                color={
                  task.status === 'completed' ? '#4CAF50' : 
                  task.status === 'in_progress' ? '#1a73e8' : '#666'
                } 
              />
              <Text style={[
                styles.taskStatusText,
                { 
                  color: task.status === 'completed' ? '#4CAF50' : 
                         task.status === 'in_progress' ? '#1a73e8' : '#666'
                }
              ]}>
                {task.status === 'completed' ? 'Tamamlandı' : 
                 task.status === 'in_progress' ? 'Devam Ediyor' : 'Bekliyor'}
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name="dots-vertical" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={styles.taskFooter}>
            <View style={styles.taskAssignee}>
              <View style={styles.assigneeAvatar}>
                <Icon name="account" size={16} color="#fff" />
              </View>
              <Text style={styles.assigneeName}>{task.assignee}</Text>
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Yeni Görev Ekle</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMembers = () => (
    <View style={styles.membersContainer}>
      {members.map(member => (
        <View key={member.id} style={styles.memberItem}>
          <View style={styles.memberInfo}>
            <View style={styles.memberAvatar}>
              <Icon name="account" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="dots-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="account-plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Üye Ekle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Image 
              source={ProjectsLogo} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => {/* TODO: Implement settings */}}
          >
            <Icon name="dots-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'overview' && styles.selectedTab]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.selectedTabText]}>
            Genel Bakış
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'tasks' && styles.selectedTab]}
          onPress={() => setSelectedTab('tasks')}
        >
          <Text style={[styles.tabText, selectedTab === 'tasks' && styles.selectedTabText]}>
            Görevler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'members' && styles.selectedTab]}
          onPress={() => setSelectedTab('members')}
        >
          <Text style={[styles.tabText, selectedTab === 'members' && styles.selectedTabText]}>
            Üyeler
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'tasks' && renderTasks()}
        {selectedTab === 'members' && renderMembers()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a73e8',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 100,
    height: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 5,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: '#1a73e8',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  overviewContainer: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1a73e8',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  tasksContainer: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskStatusText: {
    fontSize: 14,
    marginLeft: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskAssignee: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigneeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assigneeName: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  membersContainer: {
    flex: 1,
  },
  memberItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#1a73e8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProjectDetailScreen; 