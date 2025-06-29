import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MenuScreen() {
  const [currentStep, setCurrentStep] = useState('camera'); // 'camera', 'processing', 'menu', 'chat'
  const [menuItems, setMenuItems] = useState([]);

  const handleCameraCapture = () => {
    Alert.alert(
      'Camera Feature',
      'Camera functionality will be implemented here. For now, this will simulate menu capture.',
      [
        {
          text: 'Simulate Menu Scan',
          onPress: () => {
            setCurrentStep('processing');
            // Simulate processing delay
            setTimeout(() => {
              setMenuItems([
                {
                  id: 1,
                  name: 'Pan-Seared Duck Breast',
                  originalText: 'Confit de canard, cherry gastrique, pommes sarladaises',
                  explanation: 'Slow-cooked duck leg with cherry sauce and crispy potatoes cooked in duck fat'
                },
                {
                  id: 2,
                  name: 'Beef Wellington',
                  originalText: 'Boeuf en croûte, duxelles, sauce périgueux',
                  explanation: 'Beef wrapped in pastry with mushroom mixture and truffle sauce'
                }
              ]);
              setCurrentStep('menu');
            }, 2000);
          }
        },
        { text: 'Cancel' }
      ]
    );
  };

  const handleMenuItemPress = (item) => {
    Alert.alert(
      item.name,
      `Original: ${item.originalText}\n\nExplanation: ${item.explanation}`,
      [
        {
          text: 'Ask Butler',
          onPress: () => setCurrentStep('chat')
        },
        { text: 'Close' }
      ]
    );
  };

  const renderCameraView = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Menu Butler</Text>
      <Text style={styles.subtitle}>Snap a photo of any menu to get started</Text>
      
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.cameraText}>📸</Text>
        <Text style={styles.cameraSubtext}>Camera viewfinder will appear here</Text>
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={handleCameraCapture}>
        <Text style={styles.captureButtonText}>Capture Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => setCurrentStep('menu')}
      >
        <Text style={styles.secondaryButtonText}>View Sample Menu</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProcessingView = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Processing Menu...</Text>
      <Text style={styles.subtitle}>Our AI butler is reading your menu</Text>
      <View style={styles.processingIndicator}>
        <Text style={styles.processingText}>🤖</Text>
      </View>
    </View>
  );

  const renderMenuView = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentStep('camera')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu Items</Text>
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => setCurrentStep('chat')}
        >
          <Text style={styles.chatButtonText}>Chat 💬</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item)}
          >
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemOriginal}>{item.originalText}</Text>
            <Text style={styles.menuItemExplanation}>{item.explanation}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderChatView = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentStep('menu')}
        >
          <Text style={styles.backButtonText}>← Menu</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat with Butler</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.chatContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.butlerMessage}>
            🤖 Hello! I'm your personal menu butler. Ask me anything about the dishes you've scanned!
          </Text>
        </View>
        
        <View style={styles.chatPlaceholder}>
          <Text style={styles.chatPlaceholderText}>
            Chat interface will be implemented here.
            {'\n\n'}
            Features to include:
            {'\n'}• Ask questions about dishes
            {'\n'}• Get personalized recommendations
            {'\n'}• Learn pronunciations
            {'\n'}• Compare menu items
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {currentStep === 'camera' && renderCameraView()}
      {currentStep === 'processing' && renderProcessingView()}
      {currentStep === 'menu' && renderMenuView()}
      {currentStep === 'chat' && renderChatView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
  },
  cameraPlaceholder: {
    width: 300,
    height: 400,
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  cameraText: {
    fontSize: 48,
    marginBottom: 10,
  },
  cameraSubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  captureButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
  processingIndicator: {
    marginTop: 40,
  },
  processingText: {
    fontSize: 64,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  chatButton: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  chatButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  placeholder: {
    width: 60,
  },
  menuList: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  menuItemOriginal: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  menuItemExplanation: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  butlerMessage: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
  chatPlaceholder: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  chatPlaceholderText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    textAlign: 'center',
  },
});