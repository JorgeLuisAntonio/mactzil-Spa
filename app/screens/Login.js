import React,{useState, useRef } from "react";
import{Text,View,TouchableOpacity,StyleSheet} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty, size } from "lodash";
import Toast from "react-native-easy-toast";
import { validateEmail } from "../utils/validation";

export default function Login(props){
    const toastRef= useRef();
    const { navigation } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
   //patron para que no acepte caracteres especiales
    patron = /[_(!"#={*}&,;'*+%[:)-]/;
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    }else if(patron.test(formData.password)){
      toastRef.current.show("No debe llevar caracteres especiales");
    } else {
      fetch('http://192.168.0.8:3977/api/v1/sign-in',
      {
        method: 'post',
        headers: {
          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: formData.email ,
         password: formData.password
        
     })
       
      })
      .then(res => res.json())
      .then( response =>response.message?
   toastRef.current.show("El usuario o contraseña no existen"):
      navigation.navigate("cuenta"));
    }
  };

    return(
        <View style={styles.formContainer}>
        
        <View flexDirection={"row"} alignItems={"center"} marginTop={50} marginBottom={20}>
        <Icon  color={"#ffffff"} marginLeft={60}
            type="material-community"
           name= "content-cut"

          />
<Text style={styles.textTitulo} >Mactzil Spa</Text>


</View>
<Text style={styles.textBienvenida} >Bienvenido a nuestra plataforma </Text>
     <View style={styles.baseContainer}>
    
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
    
  
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
       
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
           name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
  
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      
            <TouchableOpacity onPress={()=>navigation.navigate('registro')}>
          
            <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("registro")}
      >
        Regístrate
      </Text>
    </Text>

            </TouchableOpacity>
       

            <Toast ref={toastRef} position="center" opacity={0.9} />

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:55}}>
  <View style={{flex: 1, height: 2, backgroundColor: "#0060C1"}} />
  <View>
    <Text style={{width: 100, textAlign: 'center',color: "#0060C1",
      fontWeight: "bold"}}>Redes sociales</Text>
  </View>
  <View style={{flex: 1, height: 2, backgroundColor: "#0060C1"}} />
</View>
  <View style={styles.redesContainer}>

  <Icon
            type="material-community"
           name= "instagram"
            iconStyle={styles.iconRight}
         
          />
           <Icon  marginLeft={10}
            type="material-community"
           name= "facebook"
            iconStyle={styles.iconRight}
           
          />
           <Icon marginLeft={10}
            type="material-community"
           name= "pinterest"
            iconStyle={styles.iconRight}
           
          />
  </View>
      
        </View>
        </View>
  
    )
}     

function defaultFormValue() {
    return {
      email: "",
      password: "",
    };
  }
const styles = StyleSheet.create({
  
  textTitulo: {
    color:"#FFFFFF",
    fontWeight: "bold",
   fontSize:36,
   marginLeft:8
    

  },
  textBienvenida: {
    color:"#FFFFFF",
    textAlign:"center",
   fontSize:20,
  
  
    

  },
  redesContainer:{
    flexDirection:"row",
    marginTop:20,
  },
  
   formContainer: {
   flex:1,
      backgroundColor:"#0060C1",
    },
    baseContainer: {
      flex:1,
      borderTopLeftRadius:45,
     borderTopRightRadius:45,
      alignItems: "center",
      marginTop:30,
       backgroundColor:"#FFFFFF",
    
     },
    inputStyle:{
      color: "#0060C1"
    },
    inputForm: {

      flexDirection:"row",
                    alignItems:"center",
                    width: "90%",             
                    marginTop:20,
                    borderRadius:23,
                    backgroundColor:"#F0F6FC"
                   
                    
    },
    btnContainerLogin: {
      marginTop: 30,
      width: "80%",
      
    },
    btnLogin: {
      backgroundColor: "#0060C1",
      borderRadius:23
    },
    iconRight: {
      color: "#0060C1",
    },
    
    textRegister: {
      textAlign:"center",
      marginTop:30
    },
    btnRegister: {
      color: "#0060C1",
      fontWeight: "bold",
     
    }
  });