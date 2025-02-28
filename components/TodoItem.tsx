import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Check, Trash2, CreditCard as Edit, X } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
  onEdit: (text: string) => void;
  disableEdit?: boolean;
}

export default function TodoItem({ todo, onToggle, onRemove, onEdit, disableEdit = false }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const completedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(todo.completed ? 0.7 : 1, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  return (
    <Animated.View style={[styles.container, completedStyle]}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            autoFocus
            onSubmitEditing={handleSaveEdit}
          />
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.editButton} onPress={handleSaveEdit}>
              <Check size={18} color="#27ae60" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleCancelEdit}>
              <X size={18} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
            {todo.completed ? (
              <View style={styles.checked}>
                <Check size={14} color="#fff" />
              </View>
            ) : (
              <View style={styles.unchecked} />
            )}
          </TouchableOpacity>
          
          <Text 
            style={[
              styles.text, 
              todo.completed && styles.completedText
            ]}
            numberOfLines={2}
          >
            {todo.text}
          </Text>
          
          <View style={styles.actions}>
            {!disableEdit && !todo.completed && (
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => setIsEditing(true)}
              >
                <Edit size={18} color="#3498db" />
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={onRemove}
            >
              <Trash2 size={18} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  unchecked: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  checked: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    padding: 6,
    marginLeft: 8,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  editActions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editButton: {
    padding: 6,
    marginLeft: 8,
  },
});