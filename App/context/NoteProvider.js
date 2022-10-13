import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [masterNotes, setMasterNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) {
      setNotes(JSON.parse(result));
      setMasterNotes(JSON.parse(result));
    }
  };

  useEffect(() => {
    findNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, findNotes, masterNotes, setMasterNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
