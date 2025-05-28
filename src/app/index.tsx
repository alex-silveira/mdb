import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Home from "./home";

import Header from "@/components/header";
import Footer from "@/components/footer";
export default function Index(){
    /*const [name, setName] = useState("")
    
    function handleNext(){
       router.navigate("/dashboard")
    }
    */
    return(
        <View style={styles.container}> 
            <Header title="Distribuidora Souza Lima"/>
            <View style={{ flex: 1 }}>
                <Home></Home> 
            </View>
            <Footer text="© 2025 Distruidora Souza Lima"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
    },
    title: {
        
        fontWeight: 'bold',
        textAlign:'center'
    }
})