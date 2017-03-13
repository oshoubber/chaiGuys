/**
 * ChaiGuys Georgetown React Native App
 *
 * @author Zain Rehmani
 * @flow
 */

const communicate = require('react-native-communications');
const base64 = require('base-64');
const utf8 = require('utf8');
import React, { Component } from 'react';
import {
  State,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ChaiMenuOption = require('./ChaiMenuOption');
// const client = require('twilio')(
//   'AC31cad783ce976e0fb34aefaa87f1d696',
//   'b36dc9e04c670e17609ec39f683d0f06',
// );

/* List of available options */
class ChaiMenuTable extends Component {
  state: State;
  constructor() {
    super();
    this.state = {
      menuOptions: [
        {
          index: 0,
          label: "Size",
          price: "Price",
          quantity: "Quantity",
        },
        {
          index: 1,
          label: "Small",
          price: 1.00,
          quantity: 0,
        },
        {
          index: 2,
          label: "Medium",
          price: 2.00,
          quantity: 0,
        },
        {
          index: 3,
          label: "Large",
          price: 3.00,
          quantity: 0,
        },
      ],
      number: '',
      address: '',
      hasPaid: false,
    };
  }

  _onQuantityChange = (index: number, quantity: number): void => {
    const menuOptions = this.state.menuOptions;
    menuOptions[index].quantity = quantity;
    this.setState({
      hasPaid: false,
      menuOptions: menuOptions,
    });
  };

  _handlePayment = (): void => {
    this.setState({hasPaid: true});
    const totalPrice = this.state.menuOptions
      .map((option) => typeof option.price !== 'string'
        ? option.price * option.quantity : 0)
      .reduce((x, y) => x + y);
    // const url =
    //   'https://venmo.com/' +
    //   'zrehmani' +
    //   '?txn=pay' +
    //   '&amount=' + totalPrice +
    //   '&note=for_chai_from_ChaiGuys';
    // Linking.openURL(url);
    const numSmallChai = this.state.menuOptions[1].quantity;
    const numMediumChai = this.state.menuOptions[2].quantity;
    const numLargeChai = this.state.menuOptions[3].quantity;
    const textMessage =
      'An order has been placed by ' + this.state.name + ' for ' +
      + numSmallChai > 0 ? numSmallChai + ' Small Chai ' : ''
      + numMediumChai > 0 ? numMediumChai + ' Medium Chai ' : ''
      + numLargeChai > 0 ? numLargeChai + ' Large Chai ' : ''
      + 'with total amount paid: ' + totalPrice + '. ' +
      + 'The delivery address is ' + this.state.address;
      fetch("https://api.twilio.com/2010-04-01/Accounts/AC31cad783ce976e0fb34aefaa87f1d696/Messages",
      {
        method: "POST",
        body: JSON.stringify({
          "To": "+16507850396",
          "From": "+16784859574",
          "Body": textMessage,
        }),
        headers: {
          'Authorization': 'Basic ' + base64.encode('AC31cad783ce976e0fb34aefaa87f1d696:b36dc9e04c670e17609ec39f683d0f06'),
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => console.log(response));
  };

  _onAddressChange = (text: string): void => {
    this.setState({
      hasPaid: false,
      address: text,
    });
  };

  _onPhoneNumberChange = (text: string): void => {
    this.setState({
      hasPaid: false,
      number: text,
    });
  };

  render() {
    const menuOptions = this.state.menuOptions.map((option) =>
      <ChaiMenuOption
        key={option.price}
        option={option}
        onQuantityChange={this._onQuantityChange} />
    );
    const totalPrice = this.state.menuOptions
      .map((option) => typeof option.price !== 'string'
        ? option.price * option.quantity : 0)
      .reduce((x, y) => x + y);
    // const payButtonEnabled = totalPrice > 0
    //   && this.state.address.length && this.state.number.length === 10;
    const payButtonEnabled = true;
    const paymentReceivedText = this.state.hasPaid
      ? <Text style={styles.paymentReceivedText}>
          We have received your payment!
          Our estimated delivery time is 10-30 minutes.
        </Text>
      : null;
    return (
      <View style={styles.container}>
        <Text style={styles.menuHeader}>
          Menu
        </Text>
        <View style={styles.menuOptionsContainer}>
          {menuOptions}
          <Text style={styles.totalPrice}>
            Total Price: ${totalPrice}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number (used to deliver text to us)"
            onChangeText={this._onPhoneNumberChange}
            value={this.state.number}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your address..."
            onChangeText={this._onAddressChange}
            value={this.state.address}
          />
          <TouchableOpacity
            onPress={this._handlePayment}
            style={styles.payButton}
            disabled={!payButtonEnabled}>
            <Text
              style={!payButtonEnabled ? styles.buttonOff : styles.buttonOn}>
              Order Now
            </Text>
          </TouchableOpacity>
          {paymentReceivedText}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  menuOptionsContainer: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
  },
  menuHeader: {
    fontStyle: 'italic',
    paddingBottom: 12,
    textAlign: 'center',
  },
  totalPrice: {
    paddingRight: 24,
    marginTop: 12,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  textInput: {
    height: 30,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    margin: 12,
    paddingLeft: 4,
    marginTop: 20,
  },
  payButton: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 36,
  },
  buttonOff: {
    color: '#a1a1a1',
    fontSize: 18,
  },
  buttonOn: {
    color: '#0C42FD',
    fontSize: 18,
  },
  paymentReceivedText: {
    color: '#40e0d0',
    margin: 12,
  },
});

module.exports = ChaiMenuTable;
