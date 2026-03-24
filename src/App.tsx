import { useState } from 'react';
import { Chip, TextField, Box, Typography } from '@mui/material';

const getHue = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % 360;
};

const getStatusColors = (status: string) => {
  const hue = getHue(status);

  return {
    bg: `hsl(${hue}, 70%, 92%)`,   // very light background
    text: `hsl(${hue}, 70%, 35%)`, // darker text
    border: `hsl(${hue}, 70%, 75%)`, // optional subtle border
  };
};

const StatusChip = ({ status }: { status: string }) => {
  const { bg, text, border } = getStatusColors(status);

  return (
    <Chip
      label={status}
      variant="outlined"
      sx={{
        backgroundColor: bg,
        color: text,
        borderColor: border,
        fontWeight: 500,
      }}
    />
  );
};

function App() {
  const [statusText, setStatusText] = useState('Pending');

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Live Status Chip Tester
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        <TextField
          label="Enter Status Label"
          variant="outlined"
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
          fullWidth
        />
        
        <Box 
          sx={{ 
            p: 4, 
            border: '1px dashed grey', 
            borderRadius: 2, 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 100
          }}
        >
          {statusText.trim() ? (
            <StatusChip status={statusText} />
          ) : (
            <Typography color="text.secondary">Enter a status to see the chip</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
