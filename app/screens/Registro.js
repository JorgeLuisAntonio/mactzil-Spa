import React,{useState,useRef} from "react";
import {StyleSheet,View,Text,ScrollView} from "react-native";
import {Input,Icon,Button} from "react-native-elements";
import {validateEmail} from "../utils/validation";
import Loading from "../components/Loading";
import {size,isEmpty} from "lodash";
import Toast from "react-native-easy-toast";

export default function Registro(props){
const {navigation}=props;
const toastRef= useRef();
const [showPassword,setShowPassword]=useState(false);
const [showRepeatPassword,setShowRepeatPassword]=useState(false);
const [formData, setFormData] = useState(defaultFormValue());
const [loading, setLoading] = useState(false);

patron = /[_(!"#={*}&,;'*+%[:)-]/;
const onSubmit = () => {
  if (
    isEmpty(formData.email) ||
    isEmpty(formData.password) ||
    isEmpty(formData.repeatPassword) ||
    isEmpty(formData.nombre)
  ) {
    toastRef.current.show("Todos los campos son obligatorios");
  } else if (!validateEmail(formData.email)) {
    toastRef.current.show("El email no es correcto");
  } else if (formData.password !== formData.repeatPassword) {
    toastRef.current.show("Las contrase�as tienen que ser iguales");
  } else if (size(formData.password) < 6) {
    toastRef.current.show(
      "La contrase�a tiene que tener al menos 6 caracteres"
    );
  } else if(patron.test(formData.nombre)||
  patron.test(formData.password)||
  patron.test(formData.repeatPassword)){
    toastRef.current.show(
      "No debe llevar caracteres especiales"
    );
  }
  else {
   setLoading(true);
    fetch('http://192.168.0.8:3977/api/v1/sign-up',
      {
        method: 'post',
        headers: {
          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         
          name: formData.nombre ,
          email: formData.email,
          password: formData.password,
          repeatPassword:formData.repeatPassword     
     }) 
      })
      .then(res => res.json(),setLoading(false))
      .then(response =>response.message? toastRef.current.show("El correo ya existe"):
      navigation.navigate("login"));
  }
};

const onChange=(e,type)=>{
setFormData({...formData,[type]:e.nativeEvent.text});
};

return(
    <View style={styles.viewContainer}>
      <View style={styles.viewForm}>
<Input
    placeholder="Nombre"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"nombre")}
    rightIcon={<Icon 
        type="material-community" 
        name="account" 
        iconStyle={styles.iconRight} />
    }  />
    <Input
    placeholder="Correo electronico"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"email")}
    rightIcon={<Icon 
        type="material-community" 
        name="at" 
        iconStyle={styles.iconRight} />
    }/>
    <Input
    placeholder="Contraseña"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"password")}
    password={true}
    secureTextEntry={showPassword?false:true}
    rightIcon={<Icon 
        type="material-community" 
        name={showPassword?"eye-off-outline": "eye-outline"}
        iconStyle={styles.iconRight} 
        onPress={()=>setShowPassword(!showPassword)}
        />
    }/>
     <Input
    placeholder="Repetir contraseña"
    containerStyle={styles.inputForm}
    onChange={(e)=>onChange(e,"repeatPassword")}
    password={true}
    secureTextEntry={showRepeatPassword?false:true}
    rightIcon={<Icon 
        type="material-community" 
        name={showRepeatPassword?"eye-off-outline": "eye-outline"}
        iconStyle={styles.iconRight} 
        onPress={()=>setShowRepeatPassword(!showRepeatPassword)}
        />
    } />
    <Button
    title="Unirse"
    containerStyle={styles.btnContainerRegister}
    buttonStyle={styles.btnRegister}
    onPress={onSubmit}
    />
<Loading isVisible={loading} text="Creando cuenta"/>
<Toast ref={toastRef} position="center" opacity={0.9} />
</View>
</View>

);

}

function defaultFormValue(){
    return{
      nombre:"",
email:"",
password:"",
repeatPassword:"",

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
marginHorizontal:20,
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
      borderRadius:23
},
iconRight: {
  color: "#0060C1",
   
},
viewContainer: {
  flex:1,
  backgroundColor:"#0060C1",
  }

});