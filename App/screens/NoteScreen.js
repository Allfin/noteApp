import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInput from "../components/NoteInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../context/NoteProvider";
import Note from "../components/Note";

const NoteScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBtn, setSearchBtn] = useState(false);
  const [noteId, setNoteId] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const { notes, setNotes, masterNotes, setMasterNotes } = useNotes();

  const handleSubmit = async (title, desc) => {
    const note = {
      id: Date.now(),
      title,
      desc,
      time: Date.now(),
    };
    const updateNote = [...notes, note];
    await AsyncStorage.setItem("notes", JSON.stringify(updateNote));
    setNotes(updateNote);
    setModalVisible(false);
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetails", { note });
  };

  const searchFilterByTitle = (text) => {
    if (text) {
      const newData = masterNotes.filter((item) => {
        const itemDataTitle = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const itemDataDesc = item.desc
          ? item.desc.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        console.log(textData);
        return (
          itemDataTitle.indexOf(textData) > -1 ||
          itemDataDesc.indexOf(textData) > -1
        );
      });
      setNotes(newData);
      setSearch(text);
    } else {
      setNotes(masterNotes);
      setSearch(text);
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: "white", fontWeight: "400", fontSize: 20 }}>
            Note
          </Text>
          <RoundIconBtn
            antIconName="plus"
            size={22}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <TextInput
          value={search}
          onChangeText={(text) => searchFilterByTitle(text)}
          style={styles.textInput}
          placeholder={"Search here.."}
          placeholderTextColor="#EAEFF1"
        />
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Note
              item={item}
              onPress={() => openNote(item)}
              longPress={() => openModalLingPress(item)}
              showModal={showModal}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        />
      </View>
      <NoteInput
        visible={modalVisible}
        onSubmit={handleSubmit}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    color: "white",
  },
});
