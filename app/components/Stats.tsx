import { StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as globalStyles from '../globalStyles';

const styles = StyleSheet.create({
    clearButton: {
        ...globalStyles.standardButton,
        borderColor: globalStyles.red30,
        backgroundColor: globalStyles.red0,
        borderWidth: 2,
    },
    clearButtonLabel: {
        ...globalStyles.standardButtonLabel,
        color: globalStyles.red40,
    },
});

export default function Stats() {
    return (
        <ScrollView>
            <Text> Stats </Text>
            {renderStatsThing('Today')}
            {renderStatsThing('All Time')}
            <Button
                mode='contained-tonal'
                icon='trash-can-outline'
                style={styles.clearButton}
                contentStyle={globalStyles.standardButtonContent}
                labelStyle={styles.clearButtonLabel}
            >
                Clear Stats
            </Button>
        </ScrollView>
    );
}

function renderStatsThing(heading: string) {
    return(
        <>
            <Text style={globalStyles.fontSize48}>{heading}</Text>
            <Text>Percent Correct</Text>
            <Text>Most Missed Letters:</Text>
            <Text>Most Correct Letters:</Text>
        </>
    );
}
