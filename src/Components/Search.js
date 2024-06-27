
import React from 'react' 
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, StyleSheet } from 'react-native' 
// import { Mycolors } from '../../../../utility/Mycolors' 
 import MyText from './MyText/MyText'
 
 import Color, { dimensions } from '../global/Color'
const Search = (props) => { 
    return ( 
 
        <View style={{height:50,width:'100%',borderColor:Color.GREY,borderRadius:5,borderWidth:1}}>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:1,width:'90%',alignSelf:'center'}}> 
<MyText text='Search Fundraiser' fontWeight='bold' fontSize={12} textColor={'#818181'} fontFamily='Roboto' style={{ fontWeight: '400' }} />
<Image source={require('../assest/Images/SearchH.png')} style={{height:20,width:20,}}></Image>
</View>
</View>
 
    ) 
} 
 
const styles = StyleSheet.create({ 
 
    container: { 
        flex: 1,
        backgroundColor: Color.BG_COLOR 
    }, 
    input: { 
        paddingRight: 10, 
        height: 45, 
        width: '100%', 
        fontSize: 13, 
        // borderColor: Mycolors.GrayColor, 
        // borderWidth:1, 
        backgroundColor: 'white', 
        borderRadius: 15, 
        color: Color.TEXT_COLOR, 
    marginTop: 15,
        color: '#29913C' 
        //   textAlignVertical: 'top', 
    }, 
}); 
export default Search;
