import {Pressable, StyleSheet} from "react-native";
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon, iconColor, onTaped}) {
    return (
        <Pressable onPress={onTaped}
                   style={({pressed}) => pressed && styles.pressed}
        >
            <Ionicons name={icon} size={24} color={iconColor} />
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.7,
    }
})
