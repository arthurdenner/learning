import React, { PureComponent } from 'react';
import { Container, TextInput } from '~/components';
import { NEW_TYPES, TYPES } from '~/constants';

class NewBlog extends PureComponent {
  state = {
    lines: [
      NEW_TYPES.PARAGRAPH,
      // we are aiming to handle a lot of types later...
    ],
  };

  updateParagraph = index => value => this.setState({
    lines: [
      ...this.state.lines.slice(0, index),
      {
        type: TYPES.PARAGRAPH,
        value,
      },
      ...this.state.lines.slice(index + 1),
    ],
  });

  addNewParagraph = () => this.setState({
    lines: [
      ...this.state.lines,
      NEW_TYPES.PARAGRAPH,
    ],
  });

  render() {
    const { lines } = this.state;

    return (
      <Container>
        <TextInput
          h2
          placeholder="Title"
        />

        {lines.map((line, index) =>
          line.type === TYPES.PARAGRAPH && (
            <TextInput
              key={`${line.type}-${Math.random()}`}
              value={line.value}
              placeholder={index === 0 ? 'Start typing here' : ''}
              onChangeText={this.updateParagraph(index)}
              onSubmitEditing={this.addNewParagraph}
            />
          ))}

      </Container>
    );
  }
}

export default NewBlog;
