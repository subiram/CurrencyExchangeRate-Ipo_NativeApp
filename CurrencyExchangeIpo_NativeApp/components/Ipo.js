import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const Ipo = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [ipo, setIpo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingIpo();
  }, []);

  const fetchUpcomingIpo = async () => {
    try {
      const response = await axios.get(
        'https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_9cc55ff7bf2148acb10e7592795eaa07'
      );

      setIpo(response.data);
    } catch (error) {
      console.error('Error fetching upcoming IPO:', error);
      dispatch(setErrorMessage('Error fetching upcoming IPO'));
    } finally {
      setLoading(false);
    }
  };

  const renderUpcomingIpos = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.stockName}>{`${item.companyName} ${item.symbol}`}</Text>
      <Text style={styles.latestPrice}>{`Fund Managers: ${item.managers}`}</Text>
      <Text style={styles.latestPrice}>{`Shares Available: ${item.shares}`}</Text>
      <Text style={styles.latestPrice}>{`Highest Price Range: $ ${item.priceRangeHigh}`}</Text>
      <Text style={styles.latestPrice}>{`Lowest Price Range: $ ${item.priceRangeLow}`}</Text>
    </TouchableOpacity>
  );

  const renderLoadingIndicator = () => (
    <ActivityIndicator size="large" color="#3498db" />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        renderLoadingIndicator()
      ) : (
        <FlatList
          data={ipo}
          keyExtractor={(item) => item.symbol}
          renderItem={renderUpcomingIpos}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3498db', 
  },
  card: {
    backgroundColor: '#f0f0f0', 
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    shadowRadius: 4,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
  latestPrice: {
    fontSize: 16,
    marginTop: 8,
    color: '#777', 
  },
  changePrice: {
    fontSize: 16,
    color: 'green', 
    marginTop: 4,
  },
});

export default Ipo;
