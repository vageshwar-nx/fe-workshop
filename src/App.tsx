import { useState } from 'react';
import { Chip, TextField, Box, Typography, Paper, Stack, Divider } from '@mui/material';

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
    hue,
    bg: `hsl(${hue}, 70%, 92%)`,   // very light background
    text: `hsl(${hue}, 70%, 35%)`, // darker text
    border: `hsl(${hue}, 70%, 75%)`, // optional subtle border
  };
};

const StatusChip = ({ status }: { status: string }) => {
  const { bg, text, border } = getStatusColors(status);

  return (
    <Chip
      label={status || 'Empty'}
      variant="outlined"
      sx={{
        backgroundColor: bg,
        color: text,
        borderColor: border,
        fontWeight: 600,
        px: 1,
      }}
    />
  );
};

function App() {
  const [statuses, setStatuses] = useState<string[]>(['Pending', 'Approved', 'Rejected']);

  const handleStatusChange = (index: number, value: string) => {
    const newStatuses = [...statuses];
    newStatuses[index] = value;
    setStatuses(newStatuses);
  };

  return (
    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: '#1e293b' }}>
        Status Chip Lab
      </Typography>
      
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 800 }}>
        {statuses.map((status, index) => {
          const colors = getStatusColors(status);
          
          return (
            <Paper key={index} elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 600 }}>
                    Input {index + 1}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter status..."
                    value={status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 150 }}>
                  <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 600 }}>
                    Preview
                  </Typography>
                  <StatusChip status={status} />
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 600 }}>
                    Color Values (HSL)
                  </Typography>
                  <Box sx={{ mt: 1, p: 1.5, bgcolor: '#f1f5f9', borderRadius: 2, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span style={{ color: '#64748b' }}>Hue:</span>
                      <span style={{ color: '#0f172a', fontWeight: 600 }}>{colors.hue}°</span>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span style={{ color: '#64748b' }}>BG:</span>
                      <span style={{ color: '#0f172a' }}>{colors.bg}</span>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span style={{ color: '#64748b' }}>Text:</span>
                      <span style={{ color: '#0f172a' }}>{colors.text}</span>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Border:</span>
                      <span style={{ color: '#0f172a' }}>{colors.border}</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          * Colors are dynamically generated based on the text hash
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
