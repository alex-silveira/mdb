import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import ListaPlanilha from '@/components/listspreadsheet';
import database from '@/data/database'

import Home from "./home";

import { Button } from "@/components/button"
import { Input } from "@/components/input";
export default function Index(){
    /*const [name, setName] = useState("")
    
    function handleNext(){
       router.navigate("/dashboard")
    }
    */
    return(
        <View style={styles.container}> 
        <Text style={styles.title}>Distribuidora Souza Lima</Text>
         <Text style={{textAlign: "center", fontSize: 18, textDecorationLine : 'underline'}}>Menu</Text>
        {/*
            <Text style={styles.title}>{name}</Text>
            <Input onChangeText={setName}/>
            <Button title="Entrar" onPress={handleNext}/>
      
            <SafeAreaView style={{ flex: 1 }}>
                <ListaPlanilha />
            </SafeAreaView>

        */}   
        <Home></Home> 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 12,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        gap:16
    },
    title: {
        fontSize: 28,
        marginTop: 20,
        fontWeight: 'bold',
        textAlign:'center'
    }
})