import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Playground = () => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography variant="body1" component="p" gutterBottom>
          { count }
        </Typography>
        <Button onClick={() => setCount(count + 1)}>
            Add 1
        </Button>
      </Container>
    </>
  );
};

export default Playground;
