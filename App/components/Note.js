import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
const Note = ({ item, onPress, longPress }) => {
  const { title, desc, id } = item;

  return (
    <>
      <TouchableOpacity
        style={[styles.container]}
        activeOpacity={0.7}
        onPress={onPress}
        onLongPress={longPress}
      >
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <Text style={[styles.text, styles.desc]}>{desc}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    width: "48%",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
  },
  desc: {
    opacity: 0.9,
  },
});
