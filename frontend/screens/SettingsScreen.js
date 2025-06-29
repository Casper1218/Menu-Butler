import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen() {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
    },
    allergies: {
      nuts: false,
      shellfish: false,
      eggs: false,
      soy: false,
      fish: false,
    },
    spiceLevel: 'medium', // 'mild', 'medium', 'hot'
    pronunciationGuide: true,
    notifications: true,
  });

  const handleDietaryToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: {
        ...prev.dietaryRestrictions,
        [key]: !prev.dietaryRestrictions[key]
      }
    }));
  };

  const handleAllergyToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [key]: !prev.allergies[key]
      }
    }));
  };

  const handleSpiceLevelChange = (level) => {
    setPreferences(prev => ({
      ...prev,
      spiceLevel: level
    }));
  };

  const handleGeneralToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePreferences = () => {
    Alert.alert(
      'Preferences Saved',
      'Your dining preferences have been saved successfully!',
      [{ text: 'OK' }]
    );
    // Here you would typically save to AsyncStorage or backend
  };

  const handleResetPreferences = () => {
    Alert.alert(
      'Reset Preferences',
      'Are you sure you want to reset all preferences to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setPreferences({
              dietaryRestrictions: {
                vegetarian: false,
                vegan: false,
                glutenFree: false,
                dairyFree: false,
                nutFree: false,
              },
              allergies: {
                nuts: false,
                shellfish: false,
                eggs: false,
                soy: false,
                fish: false,
              },
              spiceLevel: 'medium',
              pronunciationGuide: true,
              notifications: true,
            });
          }
        }
      ]
    );
  };

  const renderSection = (title, children) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderToggleItem = (label, value, onToggle, description = null, color = '#3498db') => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e1e8ed', true: color + '30' }}
        thumbColor={value ? color : '#bdc3c7'}
      />
    </View>
  );

  const renderSpiceLevelSelector = () => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>Preferred Spice Level</Text>
        <Text style={styles.settingDescription}>Help butler recommend dishes based on your heat tolerance</Text>
      </View>
      <View style={styles.spiceLevelContainer}>
        {['mild', 'medium', 'hot'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.spiceLevelButton,
              preferences.spiceLevel === level && styles.spiceLevelButtonActive
            ]}
            onPress={() => handleSpiceLevelChange(level)}
          >
            <Text style={[
              styles.spiceLevelText,
              preferences.spiceLevel === level && styles.spiceLevelTextActive
            ]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your dining experience</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection(
          'Dietary Restrictions',
          <>
            {Object.entries(preferences.dietaryRestrictions).map(([key, value]) => (
              <View key={key}>
                {renderToggleItem(
                  key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                  value,
                  () => handleDietaryToggle(key),
                  `Filter out ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} options`,
                  '#27ae60'
                )}
              </View>
            ))}
          </>
        )}

        {renderSection(
          'Allergies & Food Sensitivities',
          <>
            {Object.entries(preferences.allergies).map(([key, value]) => (
              <View key={key}>
                {renderToggleItem(
                  key.charAt(0).toUpperCase() + key.slice(1),
                  value,
                  () => handleAllergyToggle(key),
                  `Get warnings for ${key} ingredients`,
                  '#e74c3c'
                )}
              </View>
            ))}
          </>
        )}

        {renderSection(
          'Taste Preferences',
          renderSpiceLevelSelector()
        )}

        {renderSection(
          'App Features',
          <>
            {renderToggleItem(
              'Pronunciation Guide',
              preferences.pronunciationGuide,
              () => handleGeneralToggle('pronunciationGuide'),
              'Show phonetic spellings and audio for dish names'
            )}
            {renderToggleItem(
              'Notifications',
              preferences.notifications,
              () => handleGeneralToggle('notifications'),
              'Receive tips and updates about menu scanning'
            )}
          </>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              Menu Butler v1.0.0{'\n'}
              Your personal fine dining companion
            </Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Send Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
            <Text style={styles.saveButtonText}>Save Preferences</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPreferences}>
            <Text style={styles.resetButtonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  spiceLevelContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  spiceLevelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f1f2f6',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  spiceLevelButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  spiceLevelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  spiceLevelTextActive: {
    color: 'white',
  },
  aboutContainer: {
    alignItems: 'flex-start',
  },
  aboutText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '500',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  resetButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 40,
  },
});