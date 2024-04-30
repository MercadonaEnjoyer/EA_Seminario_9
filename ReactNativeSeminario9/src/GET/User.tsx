import React, { useState, useEffect } from "react";
import { User } from '../models/user';
import axios from "axios";
import { View, Text, TouchableOpacity, RefreshControl, FlatList, StyleSheet, SafeAreaView, ScrollView } from "react-native";
//import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';


//type GetUsersRouteProp = RouteProp<ParamListBase, 'GetUsers'>;
//type GetUsersNavigationProp = NavigationProp<ParamListBase, 'GetUsers'>;

interface GetUsersProps {
   // route: GetUsersRouteProp;
    //navigation: GetUsersNavigationProp;
    usersUpdated: boolean;
}

// const GetUsers: React.FC<GetUsersProps> = ({ usersUpdated, route, navigation }) => {
    const GetUsers: React.FC<GetUsersProps> = ({ usersUpdated }) => {
    const [users, setUsers] = useState<User[]>([]); 
    const [userData, setUserData] = useState<Record<string, any>>({});
   // const [totalPages, setTotalpages] = useState(0);
//const [currentPage, setCurrentPage] = useState(1);
const [items, setItems] = useState([]);
const [refreshing, setRefreshing] = useState(false);
const itemsPerPage = 5;

const fetchData = () => {
    //axios.get('http://10.0.2.2:3000/user')//para android
    axios.get('http://localhost:3000/user')//para web
        .then((result) => {
            console.clear();
            console.log(result.data);
            setUserData(result.data); // Rellenar la variable userData con result.data
            setUsers(result.data);
            setRefreshing(false);
        })
        .catch((err) => console.log(err));
        setRefreshing(false);
};
  

    useEffect(() => {

        fetchData();
        /* axios.get('http://localhost:3000/user/')//+currentPage+'/'+itemsPerPage)
        //axios.get('http://192.168.56.1:3000/user/'+currentPage+'/'+itemsPerPage)
        .then((result) => {
            console.clear();
            console.log(result.data); // Agregar console.log para mostrar los datos recibidos
            setUserData(result.data); // Rellenar la variable userData con result.data
            // Asignar los usuarios de userData a la variable users
            setUsers(result.data.users);
            setItems(result.data.total);
            setTotalpages(result.data.totalPages);
            setRefreshing(false);
        
        })
        .catch((err) => console.log(err));
        setRefreshing(false) */
    }, [usersUpdated])
    //,currentPage] ) 

    
   // const handlePageClick = (page: number) => setCurrentPage(page);

    const handleRefresh = () => {
        setRefreshing(true); // Se establece refreshing en true al iniciar la actualización
        fetchData(); // Llama a la función fetchData para obtener los datos actualizados
    };

    const handleEmpty = () => {
        console.log("los usuarios son:",users);
        return <Text> No Users!</Text>;
    };

    /* const renderPaginationButtons = () => {
        const maxButtonsToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }

        const buttons = [];

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handlePageClick(i)}
                    style={{
                        backgroundColor: i === currentPage ? 'gray' : 'lightgray',
                        padding: 10,
                        margin: 5,
                        borderRadius: 5,
                    }}>
                    <Text style={{color: 'white'}}>{i}</Text>
                </TouchableOpacity>,
            );
        }

        return buttons;
    }; */

        /* return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
            <View>
            <FlatList
                data={users}
                renderItem={({ item, index }) => (
                <View key={index}>
                    <Text>Name: {item.name.first_name} {item.name.middle_name} {item.name.last_name}</Text>
                    <Text>Email: {item.email}</Text>
                    <Text>Phone Number: {item.phone_number}</Text>
                    <Text>Gender: {item.gender}</Text>
                </View>
                )}
            
                ListEmptyComponent={handleEmpty}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
           {/* {  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                {renderPaginationButtons()}
            </View> } }
            </View>
            </ScrollView>
            </SafeAreaView>
        ); */

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }>
                    <View style={styles.container}>
                        <FlatList
                            data={users}
                            renderItem={({ item, index }) => (
                                <View style={styles.userContainer}>
                                    <Text>Name: {item.name.first_name} {item.name.middle_name} {item.name.last_name}</Text>
                                    <Text>Email: {item.email}</Text>
                                    <Text>Phone Number: {item.phone_number}</Text>
                                    <Text>Gender: {item.gender}</Text>
                                </View>
                            )}
                            ListEmptyComponent={handleEmpty}
                            showsVerticalScrollIndicator
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };

export default GetUsers;

/* const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: 'transparent',
    },
    paginationButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 20,
      marginHorizontal: 4,
      backgroundColor: 'gray',
    },
    activeButton: {
      backgroundColor: '#22c55d',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttonText: {
      color: 'white',
    },
  }); */

  const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    userContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});