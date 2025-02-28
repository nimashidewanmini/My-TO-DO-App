import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toggleTodo, removeTodo, clearCompleted } from '../../store/todoSlice';
import { RootState, AppDispatch } from '../../store';
import TodoItem from '../../components/TodoItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Trash } from 'lucide-react-native';

export default function CompletedTasksScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const completedTodos = useSelector((state: RootState) => 
    state.todos.items.filter(todo => todo.completed)
  );

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Completed Tasks</Text>
        <Text style={styles.subtitle}>{completedTodos.length} completed tasks</Text>
      </View>

      {completedTodos.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={handleClearCompleted}
        >
          <Trash size={16} color="#fff" />
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem 
            todo={item} 
            onToggle={() => dispatch(toggleTodo(item.id))}
            onRemove={() => dispatch(removeTodo(item.id))}
            onEdit={() => {}}
            disableEdit
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No completed tasks</Text>
            <Text style={styles.emptySubtext}>Complete a task to see it here</Text>
          </View>
        }
      />
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
    backgroundColor: '#27ae60',
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
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#95a5a6',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
  },
});