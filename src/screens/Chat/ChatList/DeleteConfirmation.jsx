import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { CloseAppStyle } from "../../Home/CloseAppStyle";
import { modalBottomSheetStyle } from "../../components/components/Modals/ModalBottomSheet/modalBottomSheet.style";
import ButtonOutline from "../../components/Buttons/ButtonOutline/ButtonOutline";
import { useTranslation } from "react-i18next";
import { rs } from "../../../utils/styles/responsiveSize";

const DeleteConfirmation = ({handleDelete, openModal, setOpenModal}) => {
    const {colors} = useTheme();
    const {t:trans} = useTranslation();
    const closeModalStyle = CloseAppStyle(colors);
    const bsExtraStyle = modalBottomSheetStyle(colors);
    return (
        <Modal animationType="fade" transparent={true} visible={openModal}>
            <View style={closeModalStyle.centeredView}>
                <View style={closeModalStyle.modalView}>
                    <Text 
                        style={[
                            bsExtraStyle.deleteConfirmationText,
                            styles.title
                        ]}
                    >
                        {trans('Are you suer! you want to delete this conversation?')}
                    </Text>
                    <View>
                        <View style={bsExtraStyle.btnCont}>
                            <ButtonOutline
                                style={bsExtraStyle.btnCancel}
                                title={trans('Cancel')}
                                onPress={() => {
                                    setOpenModal(false);
                                }}
                            />
                            <ButtonOutline
                                style={bsExtraStyle.btnDelete}
                                title={trans('Ok')}
                                onPress={handleDelete}
                                bgColor={colors.sunshade}
                                borderColor={colors.sunshade}
                                color={colors.gunPowder}
                            />
                        </View>                                 
                    </View>
                </View>                                 
            </View>
        </Modal>
    );
};

export default DeleteConfirmation;

const styles = StyleSheet.create({
    title: {
        width: rs('wf') - rs(100)
    }
});
