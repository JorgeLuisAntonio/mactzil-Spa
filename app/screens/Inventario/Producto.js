import React,{useState} from "react";
import{Text,View,StyleSheet,Dimensions,Image,ScrollView} from "react-native";
import { ListItem ,Icon,Button} from "react-native-elements";
import Modal from "../../components/Producto/Modal"
import ChangeNombreProductoForm from "../../components/Producto/ChangeNombreProductoForm"
import ChangePrecioVentaForm from "../../components/Producto/ChangePrecioVentaForm"
import ChangeExistenciaForm from "../../components/Producto/ChangeExistenciaForm";
import ChangeCostoPForm from "../../components/Producto/ChangeCostoPForm";
import ChangeTipoPForm from "../../components/Producto/ChangeTipoForm";
import ChangeProveedorForm from "../../components/Producto/ChangeProveedorForm";

export default function Producto(props) {
  const {navigation}=props;
  const { nombreProducto,precioVenta,existencia,costoProveedor,tipoProducto,proveedor} = props.route.params.dataProducto;
  const {  toastRef, setRealoadUserInfo } = props;
    const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
//const screenWidth = Dimensions.get("window").width;
//navigation.setOptions({ title: `Producto ${nombreProducto}` });
  const list = [
    {
      title: `Producto: ${nombreProducto}`,
      type:'material-community',
      icon: 'basket',
      onPress: () => selectedComponent("displayName"),
    },
    {
      title:  `Precio Venta: ${precioVenta}`,
      type:'material-community',
      icon: 'currency-usd',
      onPress: () => selectedComponent("displayPrecioV"),
    },
    {
      title: `Existencia: ${existencia}`,
      type:'material-community',
      icon: 'counter',
      onPress: () => selectedComponent("displayExistencia"),
    },
    {
      title: `Costo Proveedor: ${costoProveedor}`,
      type:'material-community',
      icon: 'currency-usd',
      onPress: () => selectedComponent("displayCostoP"),
    },
    {
      title: `Tipo Producto: ${tipoProducto}`,
      type:'material-community',
      icon: 'package-variant',
      onPress: () => selectedComponent("displayTipoP"),
    },
    {
      title: `Proveedor: ${proveedor}`,
      type:'material-community',
      icon: 'truck-fast',
      onPress: () => selectedComponent("displayProveedor"),
    }
   
  ]
    const selectedComponent = (key) => {
        switch (key) {
          case "displayName":
            setRenderComponent(
              <ChangeNombreProductoForm
               displayName={nombreProducto}
                setShowModal={setShowModal}
                toastRef={toastRef}
               setRealoadUserInfo={setRealoadUserInfo}
              />
            );
            setShowModal(true);
            break;
            case "displayPrecioV":
              setRenderComponent(
                <ChangePrecioVentaForm
                 displayPrecioV={precioVenta.toString()}
                  setShowModal={setShowModal}
                  toastRef={toastRef}
                 setRealoadUserInfo={setRealoadUserInfo}
                />
              );
              setShowModal(true);
              break;
              case "displayExistencia":
              setRenderComponent(
                <ChangeExistenciaForm
                 displayExistencia={existencia.toString()}
                  setShowModal={setShowModal}
                  toastRef={toastRef}
                 setRealoadUserInfo={setRealoadUserInfo}
                />
              );
              setShowModal(true);
              break;
              case "displayCostoP":
              setRenderComponent(
                <ChangeCostoPForm
                 displayCostoP={costoProveedor.toString()}
                  setShowModal={setShowModal}
                  toastRef={toastRef}
                 setRealoadUserInfo={setRealoadUserInfo}
                />
              );
              setShowModal(true);
              break;
              case "displayTipoP":
                setRenderComponent(
                  <ChangeTipoPForm
                   displayTipoP={tipoProducto}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                   setRealoadUserInfo={setRealoadUserInfo}
                  />
                );
                setShowModal(true);
                break;
                case "displayProveedor":
                setRenderComponent(
                  <ChangeProveedorForm
                   displayProveedor={proveedor}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                   setRealoadUserInfo={setRealoadUserInfo}
                  />
                );
                setShowModal(true);
                break;
        
          default:
            setRenderComponent(null);
            setShowModal(false);
            break;
        }
      };
    
    return (
        <ScrollView>
<Image
        style={styles.tinyLogo}
        source={require('../../../assets/img/cabello.jpg')}
     // height={2}
       resizeMode="stretch"
     //width={screenWidth}
      />

          <View>
  {
    list.map((item, i) => (
      <ListItem key={i} bottomDivider
      onPress={item.onPress}>
        <Icon name={item.icon} type={item.type}/>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
        {renderComponent && (
          <Modal isVisible={showModal} setIsVisible={setShowModal}>
            {renderComponent}
          </Modal>
        )}
      </ScrollView>
    );
        }
  const styles = StyleSheet.create({
    tinyLogo: {
      width: 360,
      height: 200,
    },
    menuItem: {
     borderBottomWidth: 1,
     borderBottomColor: "#e3e3e3",
     
    },
  });
