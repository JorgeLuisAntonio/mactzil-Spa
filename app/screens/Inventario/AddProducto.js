
import React,{useState,useRef} from "react";
import{View,StyleSheet, ScrollView} from "react-native";
import {Input,Icon,Button} from "react-native-elements"
import Loading from "../../components/Loading";
import Toast from "react-native-easy-toast";
import {size,isEmpty} from "lodash";

export default function AddProducto(props) {
  const{setShowModal}=props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const toastRef= useRef();


  const onSubmit = () => {
    if (isEmpty(formData.nombreProducto )||
      isEmpty( formData.precioVenta)||
      isEmpty(formData.proveedor) ||
      isEmpty(formData.existencia)||
      isEmpty(formData.costoProveedor)||
      isEmpty(formData.tipoProducto)) {
      toastRef.current.show("Todos los campos son obligatorios");
  
    } else {
      setLoading(true);
      fetch('http://192.168.0.8:3977/api/v1/add-producto',
      {
        method: 'post',
        headers: {
          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         
          nombreProducto: formData.nombreProducto ,
          precioVenta: formData.precioVenta,
          existencia: formData.existencia,
          costoProveedor:formData.costoProveedor,
          tipoProducto:formData.tipoProducto,
          proveedor: formData.proveedor
        
     })
       
      })
      .then(res => res.json(),setLoading(false) , setShowModal(false))
      
     
      .then(response =>console.log(response));
 
   
    }
  };
  


  const onChange=(e,type)=>{
    //console.log(type);
    //console.log(e.nativeEvent.text);
    //setFormData({[type]:e.nativeEvent.text});
    setFormData({...formData,[type]:e.nativeEvent.text});
    };
    return (
      <ScrollView>
        <View style={styles.viewBody}>
        <View style={styles.viewForm}>

<Input
    placeholder="Nombre Producto"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"nombreProducto")}
    rightIcon={<Icon 
        type="material-community" 
        name="basket" 
        iconStyle={styles.iconRight} />
    }
    
    />

    <Input
    placeholder="Precio venta"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"precioVenta")}
    keyboardType = 'numeric'
    rightIcon={<Icon 
        type="material-community" 
        name="currency-usd" 
        
        iconStyle={styles.iconRight} />
    }
    
    />
    <Input
    placeholder="Existencia"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"existencia")}
    keyboardType = 'numeric'
    rightIcon={<Icon 
        type="material-community" 
        name= "counter"
        iconStyle={styles.iconRight} 
      
        />
    }
    
    />
     <Input
    placeholder="Costo de proveedor"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"costoProveedor")}
    keyboardType = 'numeric'
    rightIcon={<Icon 
        type="material-community" 
        name="currency-usd"
        iconStyle={styles.iconRight} 
        
        />
    }
    />
    <Input
    placeholder="Tipo de Producto"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"tipoProducto")}
    rightIcon={<Icon 
        type="material-community" 
        name="package-variant"
        iconStyle={styles.iconRight} 
        
        />
    }
    />
     <Input
    placeholder="Proveedor"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"proveedor")}
    rightIcon={<Icon 
        type="material-community" 
        name="truck-fast"
        iconStyle={styles.iconRight} 
        
        />
    }
    />
    
    
    <Button
    title="Agregar"
    containerStyle={styles.btnContainerRegister}
    buttonStyle={styles.btnRegister}
    onPress={onSubmit}
    />
<Loading isVisible={loading} text="Creando cuenta"/>
<Toast ref={toastRef} position="center" opacity={0.9} />

</View>
        
     </View>
     </ScrollView>
    );
  }

  function defaultFormValue(){
    return{
nombreProducto:"",
precioVenta:"",
existencia:"",
costoProveedor:"",
tipoProducto:"",
proveedor:""
    };
}

  const styles= StyleSheet.create({
    //hay un problema con el border Bottom cuando sale el teclado del telefono se recorre y se hace todo feo
  viewForm:{
    flex:1,
   
    alignItems: "center",
    marginTop:20,
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
  marginHorizontal:15,
     backgroundColor:"#FFFFFF",
  },
  inputForm:{
  
    flexDirection:"row",
    alignItems:"center",
    width: "90%",             
    marginTop:20,
    borderRadius:23,
    backgroundColor:"#F0F6FC"
  
  },
  btnContainerRegister:{
  marginTop:20,
  width:"75%",
  
  
  },
  btnRegister:{
       backgroundColor: "#0060C1",
        borderRadius:23,
        marginBottom:20,
  },
  iconRight: {
    color: "#0060C1",
     
  },
  viewBody: {
    flex:1,
    backgroundColor:"#0060C1",
    }
  
  });