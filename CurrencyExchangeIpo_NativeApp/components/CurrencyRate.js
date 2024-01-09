import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const CurrencyRate = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [currencyRate, setCurrencyRate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCurrencyRate();
  }, [refreshing]);

  const fetchCurrencyRate = async () => {
    try {
      setRefreshing(true);
      setLoading(true);

      const response = await axios.get(
        'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_9cc55ff7bf2148acb10e7592795eaa07'
      );

      setCurrencyRate(response.data);
    } catch (error) {
      console.error('Error fetching Currency Rate:', error);
      dispatch(setErrorMessage('Error fetching Currency Rate.'));
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleCurrencyPress = (symbol) => {
    navigation.navigate('CurrencyExchangeRate', { symbol });
  };

  const renderCurrencyExchangeRate = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCurrencyPress(item.symbol)}>
      <Text style={styles.stockName}>{item.symbol}</Text>
      <Text style={styles.changePrice}>{`Rate: ${item.rate} `}</Text>
    </TouchableOpacity>
  );

  const renderLoadingIndicator = () => (
    <ActivityIndicator size="large" color="#0000ff" />
  );

  return (
    <View style={styles.container}>
      {loading && renderLoadingIndicator()} 
      <FlatList
        data={currencyRate}
        keyExtractor={(item) => item.symbol}
        renderItem={renderCurrencyExchangeRate}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCurrencyRate} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 4,
    color: '#333', 
  },
  changePrice: {
    fontSize: 16,
    color: 'blue', 
    marginTop: 4,
  },
});

export default CurrencyRate;
