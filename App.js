import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=collegedegrees&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson)=>{
          if(originalData.length < 1){
            setMyData(myJson);
            originalData=myJson;
          }
        })
  }, []);

  const FilterData = (text) => {
    if(text != '') {
      let myFilteredData = originalData.filter((item) =>
          item.Name.toLowerCase().includes(text.toLowerCase()));
      setMyData(myFilteredData);
    }
    else{
      setMyData(originalData);
    }
  }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.Name}</Text>
            <Text style={styles.itemDegree}>{item.Degree}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.header}>College Degrees</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a degree..."
                onChangeText={(text) => FilterData(text)}
            />

            {mydata.length === 0 ? (
                <Text style={styles.emptyMessage}>No degrees found.</Text>
            ) : (
                <FlatList
                    data={mydata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.ID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'lightblue',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 16,
        textAlign: 'center',
        textShadowRadius: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: 'white',
    },
    listContainer: {
        paddingBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkblue',
    },
    itemDegree: {
        fontSize: 14,
        color: 'darkred',
    },
    emptyMessage: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 16,
        marginTop: 20,
    },
});

export default App;
