import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Overlay, ModalBody, Header ,From, Input} from "./styles";
import { useState } from 'react'

interface TableModalProps {
    visible: boolean
    onClose: () => void
    onSave: (table: string) => void
}

export function TableModal({visible, onClose, onSave}: TableModalProps) {
    const [table, setTable] = useState('')

    function handleSave() {
        onSave(table)
        onClose()
        setTable('')
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <Overlay behavior={Platform.OS === 'android'? 'height' : 'padding'}>
                <ModalBody>
                    <Header>
                        <Text weight="500">Informe a mesa</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Close color="#666"/>
                        </TouchableOpacity>
                    </Header>

                    <From>
                        <Input 
                            placeholder="Número da mesa"
                            placeholderTextColor="#666"
                            keyboardType="decimal-pad"
                            onChangeText={value => setTable(value)}
                        />

                        <Button onPress={handleSave} disabled={table.length == 0}>
                            Salvar
                        </Button>
                    </From>
                </ModalBody>
            </Overlay>
        </Modal>
    )
}