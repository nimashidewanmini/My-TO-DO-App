import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState, AppDispatch } from '../../store';
import { clearAllTodos } from '../../store/todoSlice';
import { toggleDarkMode } from '../../store/settingsSlice';
import { TriangleAlert as AlertTriangle, Moon, Sun, Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.settings.darkMode);
  const totalTodos = useSelector((state: RootState) => state.todos.items.length);

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete All", 
          onPress: () => dispatch(clearAllTodos()),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            {darkMode ? (
              <Moon size={22} color="#f39c12" style={styles.settingIcon} />
            ) : (
              <Sun size={22} color="#f39c12" style={styles.settingIcon} />
            )}
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={() => dispatch(toggleDarkMode())}
            trackColor={{ false: '#ecf0f1', true: '#3498db' }}
            thumbColor={darkMode ? '#fff' : '#fff'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <TouchableOpacity 
          style={[styles.dangerButton, totalTodos === 0 && styles.disabledButton]} 
          onPress={handleClearAll}
          disabled={totalTodos === 0}
        >
          <Trash2 size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.dangerButtonText}>Clear All Tasks ({totalTodos})</Text>
        </TouchableOpacity>
        
        <View style={styles.warningBox}>
          <AlertTriangle size={20} color="#e67e22" style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Clearing all tasks will permanently delete all your tasks. This action cannot be undone.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Todo App v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#34495e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonIcon: {
    marginRight: 10,
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#fff8e1',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e67e22',
  },
  warningIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: '#95a5a6',
    fontSize: 14,
  },
});