import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setValue] = useState('Choose time')

    const options=['1', '3', '5', '7', '15']
    let listContent = undefined

    if (isOpen) {
        listContent = (
            <View style={styles.dropdownList}>
                {options.map((value, index) => (
                    <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => {
                        setValue(value)
                        setIsOpen(false)
                    }}
                    >
                    <Text>{value}</Text>
                </TouchableOpacity>
            ))}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setIsOpen(!isOpen)}>
                    <Text style={styles.buttonText}>{selectedValue}</Text>
                    <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>

                    {listContent}
                </TouchableOpacity>

                <Text style={styles.unitText}>min</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%', 
        padding: 20, 
        zIndex: 100,
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',     
        alignItems: 'center',   
        justifyContent: 'center', 
        width: '100%',
    },
    button: {
        width: 160,            
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 15, 
        borderWidth: 1, 
        borderColor: '#759579', 
        borderRadius: 8, 
        backgroundColor: '#fff',
        position: 'relative',
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    arrow: {
        fontSize: 12,
        color: '#759579',
    },
    unitText:{
        fontSize: 16,
        marginLeft: 10,           
        fontWeight: '600',
        color: '#333',
    },
    dropdownList:{
        width: 160,
        backgroundColor: '#fff', 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 8, 
        position: 'absolute',
        top: '100%',
        left: -1,
        right: -1,
        marginTop: 30
    },
    option: {
        padding: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#eee'
    }
})