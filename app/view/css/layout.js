import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');


export const LayoutSheet = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn:{
        flexDirection: 'column',
    },
    row: {
        flex: 1,
    },
    column: {
        flex:1
    },
    strechItems:{
        alignItems:'stretch'
    },


    h100:{
        height: '100%'
    },


    centerItems: {
        alignContent: 'space-between',
        alignItems: 'center',
    },
    centerSelf: {
        alignSelf: 'center',
    },
    minDim5:{
        minHeight:50,
        minWidth: 50,
    },
    box5:{
        minHeight: 50,
        minWidth: 50,
        maxHeight: 50,
        maxWidth: 50,

        // Just for test
        backgroundColor: 'rgb(220,220,200)',
        margin: 1,
        borderRadius: 3,
    }
});

export const TestSheet = StyleSheet.create({
    red: {
        backgroundColor: 'rgb(100,20,10)',
    },
    blue: {
        backgroundColor: 'rgb(50,50,190)',
    },
    green: {
        backgroundColor: 'rgb(20,100,10)',
    },
    yellow:{
        backgroundColor: 'rgb(200,180,50)'
    },

    Dim5: {
        minHeight: 80,
        minWidth: 80,
        margin:1,
        backgroundColor: 'rgb(220,220,200)'
    }
});






// export {
//     height as ScreenHeight,
//     width as ScreenWidth,
// }