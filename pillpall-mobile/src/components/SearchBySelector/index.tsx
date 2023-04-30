import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

import styles from './styles';

type SearchByOption = 'name' | 'major';

type SearchBySelectorProps = {
  searchByOptions: SearchByOption[];
  selectedSearchBy: SearchByOption | null;
  onSelectSearchBy: (searchByOption: SearchByOption) => void;
};

const SearchBySelector: React.FC<SearchBySelectorProps> = (props) => {
  const [showSearchByOptions, setShowSearchByOptions] = useState(false);

  const handleSearchByOptionPress = (searchByOption: SearchByOption) => {
    if (searchByOption !== props.selectedSearchBy) {
      props.onSelectSearchBy(searchByOption);
    }
  };

  const toggleSearchByOptions = () => {
    setShowSearchByOptions(!showSearchByOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.body1}>Search By</Text>
      <TouchableOpacity onPress={toggleSearchByOptions}>
        <View style={styles.searchByTitle}>
          <Text style={styles.searchByTitleText}>{props.selectedSearchBy || 'Select Search Option'}</Text>
          <MaterialIcons name={showSearchByOptions ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {showSearchByOptions && (
        <View style={styles.searchByList}>
          {props.searchByOptions.map((searchByOption) => (
            <TouchableOpacity key={searchByOption} onPress={() => handleSearchByOptionPress(searchByOption)}>
              <View style={[styles.searchByItem, searchByOption === props.selectedSearchBy && styles.selectedSearchByItem]}>
                <Text style={[styles.searchByText, searchByOption === props.selectedSearchBy && styles.selectedSearchByText]}>{searchByOption}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchBySelector;
