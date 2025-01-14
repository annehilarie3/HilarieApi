import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', fullname: '', age: '', password: '', secureTextEntry: true, };
  }

  Register = () => {
    let email = this.state.email;
    let fullname = this.state.fullname;
    let age = this.state.age;
    let password = this.state.password;

    if (email.length === 0 || fullname.length === 0 || age.length === 0) {
      alert("Required Field is Missing");
    } else {
      let InsertAPIURL = "http://192.168.0.68/hilarieapi/api/insert.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        email: email,
        fullname: fullname,
        age: age,
        password: password
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) => response.json())
      .then((response) => {
        alert(response[0].Message);
      })
      .catch((error) => {
        alert("Error" + error);
      })
      this.props.navigation.navigate("login");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput 
          placeholder={"Full Name"}
          placeholderTextColor={"#999"}
          style={styles.input}
          onChangeText={fullname => this.setState({ fullname })}
        />
        <TextInput 
          placeholder={"Age"}
          placeholderTextColor={"#999"}
          style={styles.input}
          onChangeText={age => this.setState({ age })}
        />
        <TextInput 
          placeholder={"Email"}
          placeholderTextColor={"#999"}
          style={styles.input}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput 
          placeholder={"Password"}
          placeholderTextColor={"#999"}
          style={styles.input}
          secureTextEntry={this.state.secureTextEntry}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity style={styles.button} onPress={this.Register}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'tomato',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'tomato',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
