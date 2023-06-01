import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, {useEffect,useState} from 'react';
import log from '../Log';
import Student from '../components/Student';

const HomeScreen = ({ navigation }) => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        console.log('useEffect has been called!');
        getListStudent();
    }, []);
    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    async function getListStudent() {
        try {
            const API_URL = 'http://192.168.56.1:3000/students';
            const response = await fetch(API_URL);
            const data = await response.json();
            setStudents(data);
            log.info('====> students:', JSON.stringify(data));
            
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
                <Button title='Go to Login Screen' onPress={navigateToLogin} />
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Student student={item} key={index}></Student>;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});
export default HomeScreen;
