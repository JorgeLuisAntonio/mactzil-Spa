import React, { useState, useCallback } from "react";
import{Text,View,StyleSheet, Image, TouchableOpacity,ActivityIndicator,Alert} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon} from "react-native-elements";
import Modal from "../../components/Producto/Modal"
import AddProducto from "./AddProducto"
import ChangeProducto from "../../components/Producto/ChangeProducto"
import { map,size } from "lodash";
//import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';


export default function Inventario(props) {
 const{isLoading}=props;
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [totalProductos, setTotalProductos] = useState(0);
    const navigation = useNavigation();

    useFocusEffect(
      useCallback(() => {
        const response =  fetch('http://192.168.0.8:3977/api/v1/list-producto', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
          }).then((response) => response.json())
        .then((responseJson) => {
          //alert(JSON.stringify(responseJson));
          //console.log(typeof responseJson);
          setData(responseJson.lista_productos);
          setTotalProductos(size(responseJson.lista_productos))
        })
        .catch((error) => {
          //Error
          alert(JSON.stringify(error));
          console.error(error);
        });
      }, [])
    ); 
    return (
  <View style={styles.viewBody}>
             {totalProductos> 0 ? ( 
   <SwipeListView 
   //swipeAnimatedValue={true}
   data={data}
   renderItem={ (producto) => (
    <Producto producto={producto} navigation={navigation} />
    
   )}
   renderHiddenItem={ (producto) => (  
 
      <BotonDelete producto={producto}  />
    
)}
  
  
stopRightSwipe={-200}
stopLeftSwipe={1}
   rightOpenValue={-200}
   keyExtractor={(item, index) => index.toString() }
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={<FooterList isLoading={isLoading} />}  
/>

) :totalProductos== 0 ? (
       
  
        <View style={styles.loaderProductos}>
        <ActivityIndicator size="large" />
        <Text fontWeight={"bold"}>No hay ningun producto</Text>
      </View>
      ):
      <View style={styles.loaderProductos}>
      <ActivityIndicator size="large" />
      <Text fontWeight={"bold"}>Cargando productos.....</Text>
    </View>
      
      }
         <Icon
          reverse
          type="material-community"
          name="plus"
          color="#0060C1"
          containerStyle={styles.btnContainer}
         onPress={() => setShowModal(true)} 
        />
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <AddProducto
        setShowModal={setShowModal} ></AddProducto>
        </Modal>
  
     </View>
   
    );
  }
  function FooterList(props) {
    const { isLoading } = props;
    if (isLoading) {
      return (
        <View style={styles.loaderProductos}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.notFoundProductos}>
          <Text style={styles.notFoundTxt}>No quedan productos por cargar ¯\_(ツ)_/¯</Text>
        </View>
      );
    }
  }
  function BotonDelete(props){
    const { producto } = props;
    const [showModal, setShowModal] = useState(false);
    const{_id}=producto.item;
  
     
   
    function eliminar(){
      Alert.alert(
        'Eliminar',
        '¿Quieres eliminar este producto de manera permanente?',
        [
          {
            text: 'Si',
            onPress: () =>  {
              fetch(`http://192.168.0.8:3977/api/v1/delete-producto/${_id}`,
              {
                method: 'delete'  
              }) .then(response => response.json())
              .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
              .catch(err => console.log(err)) 
             
          }
          },
          {
            text: 'No',
          },
        ],
        {cancelable: false},
      );
    }
    return(
      
      <View flexDirection={'row'} >
        
        <TouchableOpacity 
      style={styles.buttonEliminar}
      onPress={eliminar}
    >
      <Text style={styles.btnText}>Eliminar	</Text>
</TouchableOpacity>
        <TouchableOpacity 
      style={styles.buttonEditar}
      onPress={() => setShowModal(true)} 
    >
      <Text style={styles.btnText}>Editar	</Text>
</TouchableOpacity>
<Modal isVisible={showModal} setIsVisible={setShowModal}>
        <ChangeProducto
        setShowModal={setShowModal} producto={producto} ></ChangeProducto>
        </Modal>
      
</View>

    )
  }
  function Producto(props) {
  const { producto,navigation } = props;
  const{nombreProducto,proveedor,tipoProducto,_id}=producto.item;
  const goProducto = () => {
   navigation.navigate("producto", {dataProducto:props.producto.item});
  };

 
  return (
   
    <TouchableOpacity onPress={goProducto} >
        
    <View style={styles.viewProductos}>
    <Image
        style={styles.tinyLogo}
        source={require('../../../assets/img/barber.jpg')}
      />
   
      <View marginLeft={15} marginTop={10} marginBottom={5}> 
        <Text style={styles.nombreProducto}>{nombreProducto}</Text>
        <Text style={styles.producto}>{proveedor}</Text>
        <Text style={styles.producto}>
          {tipoProducto}
        </Text>
       
       
        </View>
     
    </View>
   

  </TouchableOpacity>
  
  );
}
  const styles = StyleSheet.create({
    tinyLogo: {
      marginLeft:7,
      width: 80,
      height: 80,
    },
    buttonEditar: {
     
      width: 90,
      height:75,
      backgroundColor: "orange", 
    },
    buttonEliminar: {
     
      width: 90,
      height:75,
      marginLeft:180,
      backgroundColor: "red", 
    },
    buttonAgregar: {
      width: 100,
      height:75,
     marginLeft:15,
      backgroundColor: "green",
      padding: 2,
     
    },
    button: {
      width: 120,
      height:37,
      backgroundColor: "orange",
      padding: 2,
    },
    btnText: {
      marginTop:20,
      color: "white",
      fontWeight:"bold",
      fontSize: 15,
      justifyContent: "center",
      textAlign: "center",
    },
    btnEditar:{
      color: "#ffffff",
    },
    notFoundTxt:{
color:"red",
    },
    producto:{
      fontSize:14,
      color:"grey",
      fontWeight: "bold",
    },
    viewProductos:{
      flexDirection:"row",
backgroundColor:"#fff"

    },
   nombreProducto:{
    fontWeight: "bold",
    fontSize:18,
   },
    viewBody: {
      flex: 1,
      backgroundColor: "#fff",
    },
    loaderProductos: {
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
    },
    btnContainer: {
      position: "absolute",
      bottom: 10,
      right: 10,
      shadowColor: "#0060C1",
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 2,
    },
    notFoundProductos: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: "center",
    
    }
  });
/*
OPCIONES PARA LISTAR
  {data.map((element)=>(
        
    <View>

     <Text>{element.nombreProducto}</Text>
     <Text>{element.existencia}</Text>
     <Text>{element.tipoProducto}</Text>
     </View>
   
))}


   <FlatList
              data={data}
              renderItem={(producto) => (              
                <Producto producto={producto} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index.toString() }
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={<FooterList isLoading={isLoading} />}      
              />
*/