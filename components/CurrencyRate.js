import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const CurrencyRate = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [currencyRate, setCurrencyRate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUpcomingIpo();
  }, [refreshing]);

  const fetchUpcomingIpo = async () => {
    try {
      setRefreshing(true);

      const response = await axios.get(
        'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_9cc55ff7bf2148acb10e7592795eaa07'
      );

      setCurrencyRate(response.data);
    } catch (error) {
      dispatch(setErrorMessage('Error fetching Currency Rate.'));
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleCurrencyPress = (symbol) => {
    navigation.navigate('StockDetail', { symbol });
  };

  const renderStockCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCurrencyPress(item.symbol)}>
      <Text style={styles.stockName}>{item.symbol}</Text>
      <Text style={styles.changePrice}>{`Rate: ${item.rate} `}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={currencyRate}
        keyExtractor={(item) => item.symbol}
        renderItem={renderStockCard}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchUpcomingIpo} />
        }
      />
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
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // for Android 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  latestPrice: {
    fontSize: 16,
    marginTop: 8,
  },
  changePrice: {
    fontSize: 16,
    color: 'green', // or use red for negative change
    marginTop: 4,
  },
});

export default CurrencyRate;
