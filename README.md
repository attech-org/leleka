# Leleka (Twitter analogue)

Students demo project for training purposes.

## Tech stack

- react
- redux
- typescript
- styled-components
- react-hook-forms
- react-router-dom
- react-bootstrap
- PWA

## Examples of using technology

### 1. Usage example FastAverageColor:

#### Grab the color palette from an image

#### This library will be useful for creating the background of a modal window

```
import { FastAverageColor } from "fast-average-color";


const [backgroundColor, setBackgroundColor] = useState("default-rgba-color");

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

#### You can research other fields of the object color

### 2. Usage example LinkPreview:

```
  import LinkPreview from "src/components/LinkPreview";

  <LinkPreview url="your-link" />
```
