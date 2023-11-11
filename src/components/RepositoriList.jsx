import React from "react";
import {Text, FlatList} from 'react-native';
import RepositoryItem from "./RepositoryItem.jsx";
import useRepositories from "../hooks/useRepositories.js";

const RepositoriList = () => {

    const { repositories } = useRepositories()

    return (
        <FlatList 
            data={repositories}
            ItemSeparatorComponent={() => <Text></Text>}
            renderItem={({ item: repo}) => (
                <RepositoryItem { ... repo } />
            )}
        />
    )
}

export default RepositoriList;