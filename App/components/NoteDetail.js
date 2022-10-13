import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RoundIconBtn from "./RoundIconBtn";
import NoteInput from "./NoteInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../context/NoteProvider";

const NoteDetail = ({ route, navigation }) => {
  const [note, setNote] = useState(route.params.note);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { setNotes } = useNotes();

  const handleOpenEditNote = () => {
    setModalVisible(true);
    setIsEdit(true);
  };

  const closeModalInput = () => {
    setModalVisible(false);
    setIsEdit(false);
  };

  const handleUpdateNote = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newNote = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.time = time;
        setNote(n);
      }
      return n;
    });
    await AsyncStorage.setItem("notes", JSON.stringify(newNote));
    setNotes(newNote);
  };

  const handleDeleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <RoundIconBtn
            antIconName="left"
            onPress={() => navigation.goBack()}
          />
          <View style={{ flexDirection: "row" }}>
            <RoundIconBtn
              antIconName="edit"
              style={{ marginRight: 20 }}
              onPress={handleOpenEditNote}
            />
            <RoundIconBtn
              antIconName="delete"
              style={{ backgroundColor: "red" }}
              onPress={handleDeleteNote}
            />
          </View>
        </View>
        <Text style={[styles.text, styles.title]}>{note.title}</Text>
        <Text style={[styles.text, styles.desc]}>{note.desc}</Text>
      </View>
      <NoteInput
        visible={modalVisible}
        onClose={closeModalInput}
        isEdit={isEdit}
        note={note}
        onSubmit={handleUpdateNote}
      />
    </>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
});
