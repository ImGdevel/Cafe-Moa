import * as React from 'react';
import { TextInput } from 'react-native-paper';

const InformationReviewScreen = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="Review"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default InformationReviewScreen;