import { View, Text, Image, StyleSheet } from "react-native";
import { CHAT, HOME } from "../routeName/routeName";
import { useTranslation } from "react-i18next";
import { getFocusedRouteNameFromRoute, useTheme } from "@react-navigation/native";
import { rs } from "../../utils/styles/responsiveSize";
import { botImage } from "../../constant/constant";

const HeaderLeftFunc = ({route}) => {
    const {colors} = useTheme()
    const {t:trans} = useTranslation();
    const routeName = getFocusedRouteNameFromRoute(route) ?? HOME;

    const styles = Styles(colors);

    if(routeName == CHAT) {
        return (
            <View style={styles.cont}>
                <Image source={{uri: botImage}} style={styles.img} />
                <Text style={styles.text}>Genie</Text>
            </View>
    )}
    return null;
  };
  
  export default HeaderLeftFunc;

  const Styles = (colors) => StyleSheet.create({
    cont: {
        marginLeft: rs(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        height: rs(35),
        width: rs(35),
        borderRadius: 50
    },
    text: {
        fontSize: rs(18),
        fontFamily: 'Gilroy-Semibold',
        color: colors.textSenary,
        marginLeft: rs(10)
    }
  })