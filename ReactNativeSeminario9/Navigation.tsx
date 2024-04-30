import React,{useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GetUsers from './src/GET/User';
import GetActivities from './src/GET/Activity';
import CreateUser from './src/POST/User';

// const HomeStackNavigator=createNativeStackNavigator();

const Tab =createBottomTabNavigator();
export default function Navigation(){
    const [usersUpdated, setUsersUpdated] = useState(false);
    const updateUserList = () => {
        setUsersUpdated(!usersUpdated);
    };

    const [activitiesUpdated, setActivitiesUpdated] = useState(false);
    const updateActivityList = () => {
        setActivitiesUpdated(!activitiesUpdated);
    };

    function MyTabs() {
        return (
            <Tab.Navigator initialRouteName='Home'>
                <Tab.Screen name="Lista de usuarios">
                    {() => <GetUsers usersUpdated={usersUpdated}  />}
                </Tab.Screen>
                <Tab.Screen name="Usuario nuevo">
                    {() => <CreateUser updateUserList={updateUserList} />}
                </Tab.Screen>
                <Tab.Screen name="Lista de actividades">
                    {() => <GetActivities activitiesUpdated={activitiesUpdated}  />}
                </Tab.Screen>
            </Tab.Navigator>
            
        );
    }
  
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>

    );
}
