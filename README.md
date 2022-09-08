# Leleka (Twitter analogue)

Students demo project for training purposes.

## Tech stack

- react
- redux
- typescript
- styled-components
- react-hook-forms
- react-router-dom

## Usage example FastAverageColor

### Grab the color palette from an image

### This library will be useful for creating the background of a modal window

```
import { FastAverageColor } from "fast-average-color";


const [backgroundColor, setBackgroundColor] = useState("rgba(181,192,200,1)"); // default color

const fac = new FastAverageColor();
    fac
    .getColorAsync(avatar) // image url
    .then((color) => {
      setBackgroundColor(color.rgba);
    })
    .catch((e) => {
      console.warn(e);
    });
```
