import Color from '../../Global/Color';
import { StyleSheet } from 'react-native';
import { height, width } from '../../Global/Constants';


export const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: width,
        // height: 134,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#545454',
    },
    container: {
        flex: 1,
        backgroundColor: Color.BLACK + '66',
        borderRadius: 10,
        // paddingBottom:40
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
    },
    blurView: {
        flex: 1,
    },
    // mainView1: {
    //     padding: 20,
    //     // margin: 20,
    //     backgroundColor: Color.BLACK3,
    //     borderRadius: 10,
    //     alignItems: 'center',
    //     alignSelf: 'center',
    //     marginBottom: height / 2 - 40,
    //     width: 593,
    //     height: 117,
    //     borderColor: '#545454',
    //     borderWidth: 1,
    // },
    pdfContainer: {
        height: '100%',
        width: '100%',
    },
    crseImg: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backImage: {
        height: 28,
        width: 28,
    },
    titleView: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container1: {
        flex: 1,
        backgroundColor: Color.BLACK + '66',
    },
    blurView: {
        flex: 1,
    },
    mainView: {
        padding: 20,
        margin: 20,
        backgroundColor: Color.WHITE,
        borderRadius: 20,
        paddingBottom:90,
        marginBottom: 60,
    },
});
