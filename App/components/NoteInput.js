import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import RoundIconBtn from "./RoundIconBtn";

const NoteInput = ({ visible, onSubmit, onClose, isEdit, note }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSave = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const handleClose = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <>
      <Modal visible={visible} animationType="fade">
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <RoundIconBtn antIconName="left" onPress={handleClose} />
            <Text style={styles.textHeader} onPress={handleSave}>
              Save
            </Text>
          </View>
          <TextInput
            value={title}
            placeholder="Title"
            placeholderTextColor="#959595"
            style={[styles.textInput, styles.title]}
            onChangeText={(text) => handleOnChangeText(text, "title")}
          />
          <TextInput
            multiline
            value={desc}
            placeholder="Type something..."
            placeholderTextColor="#959595"
            style={[styles.textInput, styles.desc]}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />
        </ScrollView>
      </Modal>
    </>
  );
};

export default NoteInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    color: "white",
    backgroundColor: "#3B3B3B",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    fontSize: 16,
  },
  textInput: {
    height: 50,
    color: "white",
  },
  title: {
    fontSize: 22,
  },
  desc: {
    fontSize: 15,
  },
});
