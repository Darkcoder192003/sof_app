// components/ChangeLanguageDialogBox.js
import React, {useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {Dialog, RadioButton} from 'react-native-paper';
import { strings } from '../../../localization';

const ChangeLanguageDialogBox = ({visible, onConfirm, onCancel}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(strings.getLanguage()); // Default language

  return (
    <Dialog visible={false} onDismiss={onCancel}>
      <Dialog.Title>Change Language</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          onValueChange={value => setSelectedLanguage(value)}
          value={selectedLanguage}>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Item label="English" value="en" />
            <RadioButton.Item label="Hindi" value="hi" />
            {/* Add more languages as needed */}
          </View>
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions>
        <Button  title ="confirm"onPress={onCancel}>Cancel</Button>
        <Button title = " cancel " onPress={() => onConfirm(selectedLanguage)}>Confirm</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChangeLanguageDialogBox;
