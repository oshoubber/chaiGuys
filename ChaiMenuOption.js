/**
 * ChaiGuys Georgetown React Native App
 *
 * @author Zain Rehmani
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  Props,
  State,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/* Render individual option */
class ChaiMenuOption extends Component {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      menuOptions: [
        {
          label: "Small",
          price: "$1.00",
          quantity: 0,
        },
        {
          label: "Medium",
          price: "$2.00",
          quantity: 0,
        },
        {
          label: "Large",
          price: "$3.00",
          quantity: 0,
        },
      ],
    };
  }

  _onQuantityDecrease = (): void => {
    const option = this.props.option;
    if (option.quantity > 0) {
      this.props.onQuantityChange(option.index, option.quantity - 1);
    }
  };

  _onQuantityIncrease = (): void => {
    const option = this.props.option;
    this.props.onQuantityChange(option.index, option.quantity + 1);
  };

  render() {
    const option = this.props.option;
    let quantityOption;
    if (typeof option.quantity === 'string') {
      quantityOption =
        <View style={styles.quantityOption}>
          <Text>
            {option.quantity}
          </Text>
        </View>
    } else {
      quantityOption =
        <View style={styles.quantityOptionToggle}>
          <TouchableOpacity
            onPress={this._onQuantityDecrease} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text>
            {option.quantity}
          </Text>
          <TouchableOpacity
            onPress={this._onQuantityIncrease} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.labelOption}>
          {option.label}
        </Text>
        <Text style={styles.priceOption}>
          ${option.price}
        </Text>
        {quantityOption}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: '#808080',
  },
  labelOption: {
    flex: 1,
  },
  priceOption: {
    flex: 1,
  },
  quantityOption: {
    flex: 1,
  },
  quantityOptionToggle: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  buttonText: {
    color: '#dc143c',
  },
});

module.exports = ChaiMenuOption;
