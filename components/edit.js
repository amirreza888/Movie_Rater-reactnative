import React, {useState,useEffect} from 'react';
import { StyleSheet, FlatList, View ,Text, Image, Button,TextInput,ScrollView,SafeAreaView } from 'react-native';




export default function Edit(props) {

    const movie = props.navigation.getParam('movie');
    const [title,setTitle]=useState(movie.title);
    const [description,setDescription]=useState(movie.description);

    const saveMovie = ()=>{

        if(movie.id){
            fetch(`http://192.168.43.219:8000/api/movies/${movie.id}/`,{
              method:'PUT',
              headers:{
                    'Authorization':`Token 2bccb19bb8de4547f29ecf2f040180c1722fef6d`,
                    'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: title, description: description})
              })
              .then( res => res.json())
              .then( movie => {
                props.navigation.navigate("Detail", {movie: movie,title:movie.title})
              })
              .catch( error=> console.log(error))

        }else {
            fetch(`http://192.168.43.219:8000/api/movies/`,{
              method:'POST',
              headers:{
                    'Authorization':`Token 2bccb19bb8de4547f29ecf2f040180c1722fef6d`,
                    'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: title, description: description})
              })
              .then( res => res.json())
              .then( movie => {
                props.navigation.navigate("MovieList")
              })
              .catch( error=> console.log(error))
        }


    };

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handle">
                <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="title"
                        onChangeText={text=>setTitle(text)}
                        value={title}
                    />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        onChangeText={text=>setDescription(text)}
                        value={description}
                        numberOfLines={5}
                        multiline={true}
                        scrollEnabled={true}
                    />
                    <Button onPress={saveMovie} title={movie.id ? "Edit" : "Add" }/>
            </ScrollView>
        </View>
    );
    }

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('movie').title,
    headerStyle: {
        backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
     headerRight:()=>(<Button title="Remove" color="red"
    onPress={()=>removeClicked(screenProps)}/>)

})

const removeClicked = (props)=>{
    console.log(props)
    const movie = props.navigation.getParam("movie");
    fetch(`http://192.168.43.219:8000/api/movies/${movie.id}/`,{
              method:'DELETE',
              headers:{
                    'Authorization':`Token 2bccb19bb8de4547f29ecf2f040180c1722fef6d`,
                    'Content-Type': 'application/json'
              },
              })
              .then( res => {
                props.navigation.navigate("MovieList")
              })
              .catch( error=> console.log(error))
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },
    label:{
      fontSize: 24,
      color:'white',
        marginTop:10
    },
    input:{
        fontSize:15,
        backgroundColor:'white',
        padding:10,
        margin:10,
        //alignItems: 'flex-start',
        //textAlign:'left',
        justifyContent:'flex-start',
        textAlignVertical: 'top',
        borderColor: 'blue',
        borderWidth: 1,
    }

});
